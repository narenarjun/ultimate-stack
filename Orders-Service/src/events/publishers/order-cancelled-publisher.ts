import { Publisher, Subjects, OrderCancelledEvent } from "@wowowow/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
