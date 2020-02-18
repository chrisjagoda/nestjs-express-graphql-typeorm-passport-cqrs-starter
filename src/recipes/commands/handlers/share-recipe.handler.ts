import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import * as clc from "cli-color";
import { RecipesService } from "../../recipes.service";
import { ShareRecipeCommand } from "../impl/share-recipe.command";
import { RecipeModel } from "../../models/recipe.model";

@CommandHandler(ShareRecipeCommand)
export class ShareRecipeHandler implements ICommandHandler<ShareRecipeCommand> {
  constructor(
    private readonly recipesService: RecipesService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: ShareRecipeCommand) {
    console.log(clc.greenBright("ShareRecipeCommand..."));

    const { id, user } = command;
    const recipe = this.publisher.mergeObjectContext(
      new RecipeModel(await this.recipesService.share(id, user))
    );
    recipe.share(user);
    recipe.commit();
  }
}
