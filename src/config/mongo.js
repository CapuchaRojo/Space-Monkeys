import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(`${process.env.MONGO_DB}`)
    .then(() => {
      console.log("Database successfully connected!!");
    })
    .catch(() => {
      console.log("Not connected to database!!");
    });
};
