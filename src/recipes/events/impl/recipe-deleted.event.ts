import { Recipe } from "../../entities/recipe.entity";
import { User } from "../../../users/entities/user.entity";

export class RecipeDeletedEvent {
  constructor(public readonly recipe: Recipe, public readonly user: User) {}
}
