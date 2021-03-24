import { Ticket } from "../ticket";

it("it implements optimistic concurrency control[occ] when a document is updated ", async (done) => {
  // Create an instance of a ticket
  const ticket = Ticket.build({
    title: "concert 22",
    price: 23,
    userId: "2223",
  });

  //  Save the ticket to the database
  await ticket.save();

  //  fetch the ticket twice
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  //  make two separate changes to the tickets we fetched
  firstInstance!.set({ price: 10 });
  secondInstance!.set({ price: 13 });

  //    save the first fetched ticket
  await firstInstance!.save();

  // save the second fetched ticket and expect an error
  try {
    await secondInstance!.save();
  } catch (err) {
    return done();
  }

  throw new Error("Should not reach this point");
});

it("it increments the version number on multiple saves", async (done) => {
  const ticket = Ticket.build({
    title: "concert 29",
    price: 20,
    userId: "wawawa",
  });

  await ticket.save();
  expect(ticket.version).toEqual(0);
  await ticket.save();
  expect(ticket.version).toEqual(1);
  await ticket.save();
  expect(ticket.version).toEqual(2);
});
