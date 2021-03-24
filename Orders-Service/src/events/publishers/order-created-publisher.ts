import { OrderCreatedEvent, Publisher, Subjects } from "@wowowow/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
