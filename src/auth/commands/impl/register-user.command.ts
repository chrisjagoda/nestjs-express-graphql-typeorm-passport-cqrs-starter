import { NewUserInput } from "../../../users/dto/new-user.input";

export class RegisterUserCommand {
  constructor(public readonly newUserInput: NewUserInput) {}
}
