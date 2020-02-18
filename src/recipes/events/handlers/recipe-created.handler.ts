import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import * as clc from "cli-color";
import { RecipeCreatedEvent } from "../impl/recipe-created.event";

@EventsHandler(RecipeCreatedEvent)
export class RecipeCreatedHandler implements IEventHandler<RecipeCreatedEvent> {
  handle(event: RecipeCreatedEvent) {
    console.log(clc.yellowBright("Async RecipeCreatedEvent..."));
  }
}
