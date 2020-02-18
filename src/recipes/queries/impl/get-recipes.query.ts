import { RecipesArgs } from "../../dto/recipes.args";

export class GetRecipesQuery {
  constructor(public readonly args: RecipesArgs) {}
}
