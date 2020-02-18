import { UserLoggedInHandler } from "./user-logged-in.handler";
import { UserRegisteredHandler } from "./user-registered.handler";
import { UserRenewedSessionHandler } from "./user-renewed-session.handler";

export const EventHandlers = [
  UserLoggedInHandler,
  UserRegisteredHandler,
  UserRenewedSessionHandler
];
