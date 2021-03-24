import { Publisher, Subjects, TicketCreatedEvent } from "@wowowow/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
