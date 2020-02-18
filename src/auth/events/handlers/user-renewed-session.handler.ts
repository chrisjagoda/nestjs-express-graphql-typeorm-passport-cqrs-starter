import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import * as clc from "cli-color";
import { UserRenewedSessionEvent } from "../impl/user-renewed-session.event";

@EventsHandler(UserRenewedSessionEvent)
export class UserRenewedSessionHandler
  implements IEventHandler<UserRenewedSessionEvent> {
  handle(event: UserRenewedSessionEvent) {
    console.log(clc.yellowBright("Async UserRenewedSessionEvent..."));
  }
}
