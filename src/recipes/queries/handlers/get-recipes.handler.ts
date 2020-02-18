import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import * as clc from "cli-color";
import { RecipesService } from "../../recipes.service";
import { GetRecipesQuery } from "../impl";
import { Recipe } from "../../entities/recipe.entity";

@QueryHandler(GetRecipesQuery)
export class GetRecipesHandler implements IQueryHandler<GetRecipesQuery> {
  constructor(private readonly recipesService: RecipesService) {}

  async execute(query: GetRecipesQuery): Promise<Recipe[]> {
    console.log(clc.yellowBright("Async GetRecipesQuery..."));
    return this.recipesService.findAll(query.args);
  }
}
