import { NewUserInput } from "../../dto/new-user.input";

export class CreateUserCommand {
  constructor(public readonly newUserInput: NewUserInput) {}
}
