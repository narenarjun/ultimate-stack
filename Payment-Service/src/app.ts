import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import cors from "cors";
import { errorHandler, NotFoundError, currentUser } from "@wowowow/common";
import { createChargeRouter } from "./routes/new";

import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";

const app = express();

const swaggeryml = YAML.load("src/payment-svc.yml");

const options = {
  explorer: true,
};

const hostValues = process.env.ALLOWED_HOSTS;

const hostArray = hostValues!.split(",")


const corsOptions = {
  origin: hostArray,
  credentials: true,
  exposedHeaders: ["set-cookie"]
}

app.use(cors(corsOptions));
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    // secure:true  //! when this is set to true, it'll only work on connection coming with https://
  })
);

app.use(currentUser);
app.use(
  "/api/payments/docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggeryml, options)
);

app.use(createChargeRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
