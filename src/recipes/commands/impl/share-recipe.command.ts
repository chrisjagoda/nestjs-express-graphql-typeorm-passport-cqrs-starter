import { User } from "../../../users/entities/user.entity";

export class ShareRecipeCommand {
  constructor(public readonly id: string, public readonly user: User) {}
}
