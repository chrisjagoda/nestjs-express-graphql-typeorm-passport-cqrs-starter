import { UsersArgs } from "../../dto/users.args";

export class GetUsersQuery {
  constructor(public readonly args: UsersArgs) {}
}
