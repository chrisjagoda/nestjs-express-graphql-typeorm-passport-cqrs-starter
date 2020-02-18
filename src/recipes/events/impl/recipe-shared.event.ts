import { User } from "../../../users/entities/user.entity";

export class RecipeSharedEvent {
  constructor(public readonly id: string, public readonly user: User) {}
}
