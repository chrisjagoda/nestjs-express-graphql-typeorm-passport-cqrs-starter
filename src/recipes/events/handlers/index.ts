import { RecipeSharedHandler } from "./recipe-shared.handler";
import { RecipeCreatedHandler } from "./recipe-created.handler";
import { RecipeUpdatedHandler } from "./recipe-updated.handler";
import { RecipeDeletedHandler } from "./recipe-deleted.handler";

export const EventHandlers = [
  RecipeSharedHandler,
  RecipeCreatedHandler,
  RecipeUpdatedHandler,
  RecipeDeletedHandler
];
