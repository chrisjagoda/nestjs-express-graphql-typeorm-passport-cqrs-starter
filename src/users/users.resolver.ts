import { UseGuards } from "@nestjs/common";
import { QueryBus, CommandBus } from "@nestjs/cqrs";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateUserCommand } from "./commands/impl/create-user.command";
import { NewUserInput } from "./dto/new-user.input";
import { UsersArgs } from "./dto/users.args";
import { User } from "./entities/user.entity";
import { GetUserQuery, GetUsersQuery } from "./queries/impl";
import { GqlAuthGuard } from "src/auth/gql.guard";

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Query(() => User)
  async user(@Args("id") id: string): Promise<User> {
    return this.queryBus.execute(new GetUserQuery(id));
  }

  @Query(() => [User])
  async users(@Args() usersArgs: UsersArgs): Promise<User[]> {
    return this.queryBus.execute(new GetUsersQuery(usersArgs));
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async createUser(
    @Args("newUserData") newUserData: NewUserInput
  ): Promise<User> {
    return this.commandBus.execute(new CreateUserCommand(newUserData));
  }
}
