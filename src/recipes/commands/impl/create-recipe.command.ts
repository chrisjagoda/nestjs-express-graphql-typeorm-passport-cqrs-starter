import { NewRecipeInput } from "../../dto/new-recipe.input";
import { User } from "../../../users/entities/user.entity";

export class CreateRecipeCommand {
  constructor(
    public readonly newRecipeInput: NewRecipeInput,
    public readonly user: User
  ) {}
}
