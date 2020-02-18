import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import * as clc from "cli-color";
import { RenewUserSessionCommand } from "../impl/renew-user-session.command";
import { AuthService } from "src/auth/auth.service";
import { AuthModel } from "../../models/auth.model";
import { UserWithToken } from "src/auth/dto/user-with-token";

@CommandHandler(RenewUserSessionCommand)
export class RenewUserSessionHandler
  implements ICommandHandler<RenewUserSessionCommand> {
  constructor(
    private readonly authService: AuthService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RenewUserSessionCommand): Promise<UserWithToken> {
    console.log(clc.yellowBright("Async RenewUserSessionCommand..."));

    const { payload } = command;
    const userWithToken = await this.authService.renew(payload.id);
    const authModel = this.publisher.mergeObjectContext(
      new AuthModel(userWithToken)
    );
    authModel.renew();
    authModel.commit();
    return userWithToken;
  }
}
