import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { natsWrapper } from "../../nats-wrapper";

it("has a route handler listening to /api/tickets for post request", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).not.toEqual(404);
});

it("can only be accessed if the user is signed in", async () => {
  await request(app).post("/api/tickets").send({}).expect(401);
});

it("returns a status other than 401 if the user is signed in ", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({});

  expect(response.status).not.toEqual(401);
});

it("returns an error if an invalid title is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "",
      price: 10,
    })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "",
      price: 10,
    })
    .expect(400);
});

it("returns an error if an invalid price is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "lkshf",
      price: -70,
    })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "ksdhas",
    })
    .expect(400);
});

it("created a ticket with valid inputs", async () => {
  let tickets = await Ticket.find({});

  expect(tickets.length).toEqual(0);
  const title = "skdhfas";

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title,
      price: 43,
    })
    .expect(201);

  tickets = await Ticket.find({});
  expect(Ticket.length).toEqual(1);
  expect(tickets[0].price).toEqual(43);
});

it("publishes an event", async () => {
  const title = "skdhfas";

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title,
      price: 43,
    })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
