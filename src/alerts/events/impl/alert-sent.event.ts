import { User } from "../../../users/entities/user.entity";

export class AlertSentEvent {
  constructor(public readonly data: any, public readonly user: User) {}
}
