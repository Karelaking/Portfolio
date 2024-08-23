const config = {
  appwriteEndPoint: String(import.meta.env.VITE_END_POINT),
  appwriteProjectId: String(import.meta.env.VITE_PROJECT_ID),
  appwriteDataBaseId: String(import.meta.env.VITE_DATABASE_ID),
};

export default config;
