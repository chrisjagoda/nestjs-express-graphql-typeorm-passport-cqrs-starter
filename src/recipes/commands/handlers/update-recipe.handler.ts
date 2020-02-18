import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import * as clc from "cli-color";
import { RecipesService } from "../../recipes.service";
import { UpdateRecipeCommand } from "../impl/update-recipe.command";
import { RecipeModel } from "src/recipes/models/recipe.model";
import { Recipe } from "../../entities/recipe.entity";

@CommandHandler(UpdateRecipeCommand)
export class UpdateRecipeHandler
  implements ICommandHandler<UpdateRecipeCommand> {
  constructor(
    private readonly recipesService: RecipesService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateRecipeCommand): Promise<Recipe> {
    console.log(clc.yellowBright("Async UpdateRecipeCommand..."));

    const { updateRecipeInput, user } = command;
    const recipe = await this.recipesService.update(updateRecipeInput, user);
    const recipeModel = this.publisher.mergeObjectContext(
      new RecipeModel(recipe)
    );
    recipeModel.update(user);
    recipeModel.commit();
    return recipe;
  }
}
