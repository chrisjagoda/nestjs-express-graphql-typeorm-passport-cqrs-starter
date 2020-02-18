import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import * as clc from "cli-color";
import { LoginUserCommand } from "../impl/login-user.command";
import { AuthService } from "src/auth/auth.service";
import { AuthModel } from "../../../auth/models/auth.model";
import { UserWithToken } from "src/auth/dto/user-with-token";

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
  constructor(
    private readonly authService: AuthService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: LoginUserCommand): Promise<UserWithToken> {
    console.log(clc.yellowBright("Async LoginUserCommand..."));

    const { loginUserInput } = command;
    const { username, password } = loginUserInput;
    const userWithToken = await this.authService.login(username, password);
    const authModel = this.publisher.mergeObjectContext(
      new AuthModel(userWithToken)
    );
    authModel.login();
    authModel.commit();
    return userWithToken;
  }
}
