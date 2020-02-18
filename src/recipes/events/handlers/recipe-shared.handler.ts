import { IEventHandler } from "@nestjs/cqrs";
import { EventsHandler } from "@nestjs/cqrs/dist/decorators/events-handler.decorator";
import * as clc from "cli-color";
import { RecipeSharedEvent } from "../impl/recipe-shared.event";

@EventsHandler(RecipeSharedEvent)
export class RecipeSharedHandler implements IEventHandler<RecipeSharedEvent> {
  handle(event: RecipeSharedEvent) {
    console.log(clc.greenBright("RecipeSharedEvent..."));
  }
}
