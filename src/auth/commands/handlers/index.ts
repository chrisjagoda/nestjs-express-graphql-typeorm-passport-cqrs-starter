import { LoginUserHandler } from "./login-user.handler";
import { RegisterUserHandler } from "./register-user.handler";
import { RenewUserSessionHandler } from "./renew-user-session.handler";

export const CommandHandlers = [
  LoginUserHandler,
  RegisterUserHandler,
  RenewUserSessionHandler
];
