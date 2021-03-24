import mongoose from "mongoose";
import { app } from "./app";

// PORT value 
const PORT = process.env.PORT || 4000;

// mongoose connection
const start = async () => {
  if (!process.env.JWTSECRET) {
    throw new Error("JWTSECRET must be defined");
  }
  if (!process.env.AUTH_MONGO_DB_URI) {
    throw new Error("AUTH_MONGO_DB_URI must be defined")
  }
  try {
    // ! this must be changed to use environment variable
    await mongoose.connect(process.env.AUTH_MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to MongoDb");
  } catch (err) {
    console.error(err);
  }
  app.listen(PORT, () => {
    console.log(`Auth service listening on Port ${PORT}!`);
  });
};

start();
