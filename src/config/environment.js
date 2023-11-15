import 'dotenv/config';


export const env = {
  MONGODB_URI : process.env.MONGODB_URI, 
  APP_PORT: process.env.PORT,
  JWT_ACCESS_KEY: process.env.JWT_ACCESS_KEY,
  JWT_REFRESH_KEY: process.env.JWT_REFRESH_KEY,
  ROLES: process.env.ROLES,
}
