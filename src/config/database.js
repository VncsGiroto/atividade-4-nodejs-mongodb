import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

export async function connectDatabase(
  uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017",
  dbName = process.env.MONGODB_DB || "escola",
) {
  await mongoose.connect(uri, { dbName, serverSelectionTimeoutMS: 10000 });
}

export async function disconnectDatabase() {
  await mongoose.disconnect();
}
