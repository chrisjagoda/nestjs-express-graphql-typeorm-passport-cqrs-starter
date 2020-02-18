import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import * as clc from "cli-color";
import { RecipesService } from "../../recipes.service";
import { DeleteRecipeCommand } from "../impl/delete-recipe.command";
import { RecipeModel } from "src/recipes/models/recipe.model";
import { Recipe } from "../../entities/recipe.entity";

@CommandHandler(DeleteRecipeCommand)
export class DeleteRecipeHandler
  implements ICommandHandler<DeleteRecipeCommand> {
  constructor(
    private readonly recipesService: RecipesService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: DeleteRecipeCommand): Promise<Recipe> {
    console.log(clc.yellowBright("Async DeleteRecipeCommand..."));

    const { id, user } = command;
    const recipe = await this.recipesService.delete(id, user);
    const recipeModel = this.publisher.mergeObjectContext(
      new RecipeModel(recipe)
    );
    recipeModel.delete(user);
    recipeModel.commit();
    return recipe;
  }
}
