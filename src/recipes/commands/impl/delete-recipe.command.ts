import { User } from "../../../users/entities/user.entity";

export class DeleteRecipeCommand {
  constructor(public readonly id: string, public readonly user: User) {}
}
