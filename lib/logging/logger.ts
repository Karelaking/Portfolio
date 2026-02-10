import fs from "node:fs";
import path from "node:path";
import { Writable } from "node:stream";
import pino from "pino";

const isEdgeRuntime = process.env.NEXT_RUNTIME === "edge";
const isServerRuntime = typeof window === "undefined" && !isEdgeRuntime;

const logDir = path.join(process.cwd(), "logs");
const formatDateKey = (date: Date): string => {
  return date.toISOString().slice(0, 10);
};

const ensureLogDir = (): void => {
  fs.mkdirSync(logDir, { recursive: true });
};

const createFileStream = (): {
  stream: fs.WriteStream;
  dateKey: string;
} => {
  const dateKey = formatDateKey(new Date());
  const filename = `server-${dateKey}.log`;
  const filePath = path.join(logDir, filename);
  const stream = fs.createWriteStream(filePath, { flags: "a" });
  return { stream, dateKey };
};

const createRotatingFileStream = (): Writable => {
  ensureLogDir();

  let { stream, dateKey } = createFileStream();

  const rotateIfNeeded = (): void => {
    const currentKey = formatDateKey(new Date());
    if (currentKey !== dateKey) {
      stream.end();
      const next = createFileStream();
      stream = next.stream;
      dateKey = next.dateKey;
    }
  };

  return new Writable({
    write(chunk, encoding, callback) {
      try {
        rotateIfNeeded();
        stream.write(chunk, encoding, callback);
      } catch (error) {
        callback(error as Error);
      }
    },
  });
};

const createLogger = (): pino.Logger => {
  if (!isServerRuntime) {
    return pino();
  }

  const streams: pino.StreamEntry[] = [
    {
      level: process.env.LOG_LEVEL ?? "info",
      stream: createRotatingFileStream(),
    },
  ];

  if (process.env.NODE_ENV !== "production") {
    streams.push({ level: "debug", stream: pino.destination(1) });
  }

  return pino(
    {
      level: process.env.LOG_LEVEL ?? "info",
      timestamp: pino.stdTimeFunctions.isoTime,
      base: { service: "portfolio" },
    },
    pino.multistream(streams),
  );
};

export const logger = createLogger();

export const createScopedLogger = (scope: string): pino.Logger => {
  return logger.child({ scope });
};
