import mongoose from "mongoose";

const readMongoConfig = (): { uri: string; dbName: string } => {
  return {
    uri: process.env.MONGODB_URI ?? "",
    dbName: process.env.MONGODB_DB_NAME ?? "portfolio",
  };
};

const hasPlaceholderHost = (hostname: string): boolean => {
  return (
    hostname.includes("<") ||
    hostname.includes(">") ||
    hostname.includes("cluster-name") ||
    hostname.includes("your-") ||
    hostname.includes("example")
  );
};

const validateMongoUri = (uri: string): void => {
  if (!uri) {
    throw new Error(
      "MONGODB_URI is not configured. Add it to your environment variables.",
    );
  }

  if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
    throw new Error(
      `MONGODB_URI must start with "mongodb://" or "mongodb+srv://".`,
    );
  }

  let parsed: URL;
  try {
    parsed = new URL(uri);
  } catch {
    throw new Error("MONGODB_URI is not a valid URL.");
  }

  if (!parsed.hostname || hasPlaceholderHost(parsed.hostname)) {
    throw new Error(
      `MONGODB_URI host appears to be a placeholder (${parsed.hostname || "missing-host"}). Replace it with your real MongoDB cluster host, e.g. "cluster0.xxxxx.mongodb.net".`,
    );
  }
};

interface MongoGlobal {
  mongooseConnectionPromise?: Promise<typeof mongoose>;
}

const globalForMongo = globalThis as typeof globalThis & MongoGlobal;

const normalizeMongoConnectionError = (error: unknown): Error => {
  const candidate = error as {
    code?: string;
    message?: string;
    hostname?: string;
  };

  const message = candidate?.message ?? "";
  const code = candidate?.code ?? "";
  const hostname = candidate?.hostname ?? "";

  if (
    code === "EBADNAME" ||
    message.includes("querySrv EBADNAME") ||
    hostname.includes("<cluster-name>")
  ) {
    return new Error(
      "MongoDB URI is using a placeholder host. Set MONGODB_URI to your real Atlas host (for example: cluster0.xxxxx.mongodb.net), then restart the dev server.",
    );
  }

  return error instanceof Error ? error : new Error("Failed to connect to MongoDB.");
};

export const connectMongo = async (): Promise<typeof mongoose> => {
  const { uri, dbName } = readMongoConfig();
  validateMongoUri(uri);

  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  if (!globalForMongo.mongooseConnectionPromise) {
    globalForMongo.mongooseConnectionPromise = mongoose
      .connect(uri, {
        dbName,
        maxPoolSize: 20,
        minPoolSize: 2,
      })
      .catch((error: unknown) => {
        globalForMongo.mongooseConnectionPromise = undefined;
        throw normalizeMongoConnectionError(error);
      });
  }

  return globalForMongo.mongooseConnectionPromise;
};
