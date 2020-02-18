import { ShareRecipeHandler } from "./share-recipe.handler";
import { CreateRecipeHandler } from "./create-recipe.handler";
import { UpdateRecipeHandler } from "./update-recipe.handler";
import { DeleteRecipeHandler } from "./delete-recipe.handler";

export const CommandHandlers = [
  ShareRecipeHandler,
  CreateRecipeHandler,
  UpdateRecipeHandler,
  DeleteRecipeHandler
];
