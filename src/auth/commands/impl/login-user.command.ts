import { LoginUserInput } from "../../dto/login-user.input";

export class LoginUserCommand {
  constructor(public readonly loginUserInput: LoginUserInput) {}
}
