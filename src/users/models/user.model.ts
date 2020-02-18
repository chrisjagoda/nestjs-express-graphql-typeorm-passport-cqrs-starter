import { AggregateRoot } from "@nestjs/cqrs";
import { UserCreatedEvent } from "../events/impl/user-created.event";
import { User } from "../entities/user.entity";

export class UserModel extends AggregateRoot {
  constructor(private readonly user: User) {
    super();
  }

  get(): User {
    return this.user;
  }

  create() {
    // logic
    this.apply(new UserCreatedEvent(this.user));
  }
}
