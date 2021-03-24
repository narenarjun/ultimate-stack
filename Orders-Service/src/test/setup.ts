import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

declare global {
  namespace NodeJS {
    interface Global {
      signin(): string[];
    }
  }
}

jest.mock("../nats-wrapper.ts");

let mongo: any;
beforeAll(async () => {
  //! setting environment variable for jwtsecret for test environment
  process.env.JWTSECRET = "qwer123qwer";
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = () => {
  // Build a JWT payload for tests. {id,email}
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };

  // creating the JWT
  const token = jwt.sign(payload, process.env.JWTSECRET!);

  // building session object {jwt: JWT_Object}
  const session = { jwt: token };

  // Turning that session into JSON
  const sessionJSON = JSON.stringify(session);

  //  Taking the JSON and encoding it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");

  // return a string thats the cookie with the encoded data
  return [`express:sess=${base64}`];
};
