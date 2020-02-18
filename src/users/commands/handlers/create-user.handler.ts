import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import * as clc from "cli-color";
import { CreateUserCommand } from "../impl/create-user.command";
import { UserModel } from "../../models/user.model";
import { UsersService } from "../../users.service";

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly usersService: UsersService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateUserCommand) {
    console.log(clc.yellowBright("Async CreateUserCommand..."));

    const { newUserInput } = command;
    const user = this.publisher.mergeObjectContext(
      new UserModel(await this.usersService.create(newUserInput))
    );
    user.create();
    user.commit();
  }
}
