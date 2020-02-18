import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import * as clc from "cli-color";
import { RecipeDeletedEvent } from "../impl/recipe-deleted.event";

@EventsHandler(RecipeDeletedEvent)
export class RecipeDeletedHandler implements IEventHandler<RecipeDeletedEvent> {
  handle(event: RecipeDeletedEvent) {
    console.log(clc.yellowBright("Async RecipeDeletedEvent..."));
  }
}
