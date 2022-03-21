import dotenv from 'dotenv';
dotenv.config();

const required = (key, defaultValue = undefined) => {
  const value = process.env[key] || defaultValue;

  // console.log({key, process: process.env, value});

  if (value === null) throw new Error(`Key ${key} is undefined`);
  else return value;
}

export const config = {
  cors: {
    allowedOrigin: required('CORS_ALLOW_ORIGIN', "http://localhost:3000"),
  },
  host: {
    port: parseInt(required('PORT', 8080)),
  },
  db: {
    mongoURI: required('MONGO_URI')
  },
  jwt: {
    secretKey: required('JWT_SECRET'),
    expiresInSec: parseInt(required('JWT_EXPIRES_SEC', 86400)),
  }
};