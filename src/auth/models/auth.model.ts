import { AggregateRoot } from "@nestjs/cqrs";
import { UserWithToken } from "../dto/user-with-token";
import { UserLoggedInEvent } from "../events/impl/user-logged-in.event";
import { UserRegisteredEvent } from "../events/impl/user-registered.event";
import { UserRenewedSessionEvent } from "../events/impl/user-renewed-session.event";

export class AuthModel extends AggregateRoot {
  constructor(private readonly userWithToken: UserWithToken) {
    super();
  }

  register() {
    // logic
    this.apply(new UserRegisteredEvent(this.userWithToken));
  }

  login() {
    // logic
    this.apply(new UserLoggedInEvent(this.userWithToken));
  }

  renew() {
    // logic
    this.apply(new UserRenewedSessionEvent(this.userWithToken));
  }
}
