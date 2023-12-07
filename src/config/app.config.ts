export const EnvConfiguration = () => ({
  ENVIRONMENT: process.env.ENVIRONMENT || 'dev',
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT || 3000,
});
