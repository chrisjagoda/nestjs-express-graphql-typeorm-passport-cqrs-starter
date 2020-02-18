import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import * as clc from "cli-color";
import { RecipeUpdatedEvent } from "../impl/recipe-updated.event";

@EventsHandler(RecipeUpdatedEvent)
export class RecipeUpdatedHandler implements IEventHandler<RecipeUpdatedEvent> {
  handle(event: RecipeUpdatedEvent) {
    console.log(clc.yellowBright("Async RecipeUpdatedEvent..."));
  }
}
