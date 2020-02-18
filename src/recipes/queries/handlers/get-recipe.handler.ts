import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import * as clc from "cli-color";
import { RecipesService } from "../../recipes.service";
import { GetRecipeQuery } from "../impl";
import { Recipe } from "../../entities/recipe.entity";

@QueryHandler(GetRecipeQuery)
export class GetRecipeHandler implements IQueryHandler<GetRecipeQuery> {
  constructor(private readonly recipesService: RecipesService) {}

  async execute(query: GetRecipeQuery): Promise<Recipe> {
    console.log(clc.yellowBright("Async GetRecipeQuery..."));
    return this.recipesService.findOneById(query.id);
  }
}
