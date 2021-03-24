import { PaymentCreatedEvent, Publisher, Subjects } from "@wowowow/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
