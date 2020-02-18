import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import * as clc from "cli-color";
import { RecipesService } from "../../recipes.service";
import { CreateRecipeCommand } from "../impl/create-recipe.command";
import { RecipeModel } from "src/recipes/models/recipe.model";
import { Recipe } from "../../entities/recipe.entity";

@CommandHandler(CreateRecipeCommand)
export class CreateRecipeHandler
  implements ICommandHandler<CreateRecipeCommand> {
  constructor(
    private readonly recipesService: RecipesService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateRecipeCommand): Promise<Recipe> {
    console.log(clc.yellowBright("Async CreateRecipeCommand..."));

    const { newRecipeInput, user } = command;
    const recipe = await this.recipesService.create(newRecipeInput, user);
    const recipeModel = this.publisher.mergeObjectContext(
      new RecipeModel(recipe)
    );
    recipeModel.create(user);
    recipeModel.commit();
    return recipe;
  }
}
