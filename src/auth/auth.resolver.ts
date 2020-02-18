import { UseGuards } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { LoginUserInput } from "./dto/login-user.input";
import { NewUserInput } from "src/users/dto/new-user.input";
import { UserWithToken } from "./dto/user-with-token";
import { LoginUserCommand } from "./commands/impl/login-user.command";
import { RegisterUserCommand } from "./commands/impl/register-user.command";
import { RenewUserSessionCommand } from "./commands/impl/renew-user-session.command";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { GqlAuthGuard } from "./gql.guard";

@Resolver(() => UserWithToken)
export class AuthResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => UserWithToken)
  async register(
    @Args("newUserData") newUserData: NewUserInput
  ): Promise<UserWithToken> {
    return this.commandBus.execute(await new RegisterUserCommand(newUserData));
  }

  @Mutation(() => UserWithToken)
  async login(
    @Args("loginUserData") loginUserData: LoginUserInput
  ): Promise<UserWithToken> {
    return this.commandBus.execute(new LoginUserCommand(loginUserData));
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => UserWithToken)
  async renew(@CurrentUser() user): Promise<UserWithToken> {
    return this.commandBus.execute(new RenewUserSessionCommand(user));
  }
}
