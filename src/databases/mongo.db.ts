import mongoose from "mongoose";

const _MONGOURI = (process.env.DB_HOST ||
  "mongodb://localhost:27017") as string;
const _MONGOUSER = (process.env.DB_USER || "root") as string;
const _MONGOPASS = (process.env.DB_PASS || "admin123") as string;
const _MONGODB = (process.env.DB_NAME || "takez") as string;
const _STRICTQUERY = (process.env.DB_STRICT_QUERY || false) as boolean;

mongoose.set(`strictQuery`, _STRICTQUERY);
const mongo = mongoose.connect(_MONGOURI, {
  user: _MONGOUSER,
  pass: _MONGOPASS,
  dbName: _MONGODB,
});

export default mongo;
