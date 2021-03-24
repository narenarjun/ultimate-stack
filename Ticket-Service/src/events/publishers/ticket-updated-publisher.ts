import { Publisher, Subjects, TicketUpdatedEvent } from "@wowowow/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
