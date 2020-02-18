import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import * as clc from "cli-color";
import { AuthService } from "../../auth.service";
import { RegisterUserCommand } from "../impl/register-user.command";
import { AuthModel } from "src/auth/models/auth.model";
import { UserWithToken } from "src/auth/dto/user-with-token";

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler
  implements ICommandHandler<RegisterUserCommand> {
  constructor(
    private readonly authService: AuthService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RegisterUserCommand): Promise<UserWithToken> {
    console.log(clc.yellowBright("Async RegisterUserCommand..."));

    const { newUserInput } = command;
    const userWithToken = await this.authService.register(newUserInput);
    const authModel = this.publisher.mergeObjectContext(
      new AuthModel(userWithToken)
    );
    authModel.register();
    authModel.commit();
    return userWithToken;
  }
}
