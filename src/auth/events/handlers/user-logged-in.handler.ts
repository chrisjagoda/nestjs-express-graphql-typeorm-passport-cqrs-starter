import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import * as clc from "cli-color";
import { UserLoggedInEvent } from "../impl/user-logged-in.event";

@EventsHandler(UserLoggedInEvent)
export class UserLoggedInHandler implements IEventHandler<UserLoggedInEvent> {
  handle(event: UserLoggedInEvent) {
    console.log(clc.yellowBright("Async UserLoggedInEvent..."));
  }
}
