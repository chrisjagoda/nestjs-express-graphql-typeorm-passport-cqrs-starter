import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import * as clc from "cli-color";
import { UsersService } from "../../users.service";
import { GetUserQuery } from "../impl";
import { User } from "../../entities/user.entity";

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(private readonly usersService: UsersService) {}

  async execute(query: GetUserQuery): Promise<User> {
    console.log(clc.yellowBright("Async GetUserQuery..."));
    return this.usersService.findOneById(query.id);
  }
}
