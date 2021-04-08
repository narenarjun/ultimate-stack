import mongoose from "mongoose";
import { app } from "./app";
import { OrderCancelledListener } from "./events/listeners/order-cancelled-listener";
import { OrderCreatedListener } from "./events/listeners/order-created-listener";
import { natsWrapper } from "./nats-wrapper";

// PORT value
const PORT = process.env.PORT || 4001;

// mongoose connection
const start = async () => {
  if (!process.env.JWTSECRET) {
    throw new Error("JWTSECRET must be defined");
  }
  if (!process.env.TICKETS_MONGO_DB_URI) {
    throw new Error("MONGO_URI must be defined");
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS_CLIENT_ID must be defined");
  }
  if (!process.env.NATS_URL) {
    throw new Error("NATS_URL must be defined");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS_CLUSTER_ID must be defined");
  }
  if(!process.env.ALLOWED_HOSTS){
    throw new Error("ALLOWED_HOSTS value must be defined")
  }
  try {
    // ! values for the nats client must be extracted to be used via environment variables
    // ? nats client id (second value), will be great if we set it to the value of the pod name its running
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );

    // ? Graceful shutdown for NATS streaming server
    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });

    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    // plugging in listeners
    new OrderCreatedListener(natsWrapper.client).listen();
    new OrderCancelledListener(natsWrapper.client).listen();

    // ! this must be changed to use environment variable
    await mongoose.connect(process.env.TICKETS_MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to MongoDb");
  } catch (err) {
    console.error(err);
  }
  app.listen(PORT, () => {
    console.log(`Ticket service listening on Port ${PORT}!`);
  });
};

start();
