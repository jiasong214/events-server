import dotenv from 'dotenv';
dotenv.config();

const required = (key, defaultValue = undefined) => {
  // if the value is not exist in .env, it'll use the second parameter.
  // (if you didn't pass the second parameter, it'll be undefined)
  const value = process.env[key] || defaultValue;

  // throw the error if the value is undefined
  if (value === undefined) {
    throw new Error(`Key ${key} is undefined`);
  }

  return value;
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