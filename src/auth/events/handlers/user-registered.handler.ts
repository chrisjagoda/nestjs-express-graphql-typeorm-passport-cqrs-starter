import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import * as clc from "cli-color";
import { UserRegisteredEvent } from "../impl/user-registered.event";

@EventsHandler(UserRegisteredEvent)
export class UserRegisteredHandler
  implements IEventHandler<UserRegisteredEvent> {
  handle(event: UserRegisteredEvent) {
    console.log(clc.yellowBright("Async UserRegisteredEvent..."));
  }
}
