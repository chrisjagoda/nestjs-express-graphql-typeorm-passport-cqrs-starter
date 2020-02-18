import { Recipe } from "../../../recipes/entities/recipe.entity";
import { User } from "../../../users/entities/user.entity";

export class RecipePublishedAlertCommand {
  constructor(public readonly recipe: Recipe, public readonly user: User) {}
}
