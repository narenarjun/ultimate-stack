import { ExpirationCompleteEvent, Publisher, Subjects } from "@wowowow/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
