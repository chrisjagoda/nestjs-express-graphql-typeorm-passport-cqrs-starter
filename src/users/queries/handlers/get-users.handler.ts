import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import * as clc from "cli-color";
import { UsersService } from "../../users.service";
import { GetUsersQuery } from "../impl";
import { User } from "../../entities/user.entity";

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(private readonly usersService: UsersService) {}

  async execute(query: GetUsersQuery): Promise<User[]> {
    console.log(clc.yellowBright("Async GetUsersQuery..."));
    return this.usersService.findAll(query.args);
  }
}
