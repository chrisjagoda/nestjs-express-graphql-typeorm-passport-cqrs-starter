import { UpdateRecipeInput } from "../../dto/update-recipe.input";
import { User } from "../../../users/entities/user.entity";

export class UpdateRecipeCommand {
  constructor(
    public readonly updateRecipeInput: UpdateRecipeInput,
    public readonly user: User
  ) {}
}
