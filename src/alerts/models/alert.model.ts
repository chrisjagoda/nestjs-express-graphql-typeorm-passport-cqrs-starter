import { AggregateRoot } from "@nestjs/cqrs";
import { AlertSentEvent } from "../events/impl/alert-sent.event";
import { Alert } from "../entities/alert.entity";
import { User } from "../../users/entities/user.entity";

export class AlertModel extends AggregateRoot {
  constructor(private readonly alert: Alert) {
    super();
  }

  send(user: User) {
    // logic
    this.apply(new AlertSentEvent(this.alert, user));
  }
}
