import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import cors from "cors";
import { errorHandler, NotFoundError } from "@wowowow/common";
// import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'

import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";
// import { options } from "./swaggergen";
import YAML from 'yamljs'

const app = express();

// const swaggerSpec = swaggerJSDoc(options)

const swaggeryml = YAML.load("src/auth-svc.yml")
const options = {
  explorer:true
}

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
app.use('/api/auth/docs',swaggerUI.serve,swaggerUI.setup(swaggeryml,options))
app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
