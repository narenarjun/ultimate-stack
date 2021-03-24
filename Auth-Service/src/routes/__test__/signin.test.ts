import request from "supertest";
import { app } from "../../app";

it("fails when a email that deos not exist is supplied ", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "laskhdadlkh",
    })
    .expect(400);
});

it("fails when a incorrect password is supplied", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password123",
    })
    .expect(400);
});

it("cookie is got when valid credentails are given", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
});
