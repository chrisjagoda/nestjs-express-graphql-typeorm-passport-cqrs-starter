import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import * as clc from "cli-color";
import { ReviewUpdatedEvent } from "../impl/review-updated.event";

@EventsHandler(ReviewUpdatedEvent)
export class ReviewUpdatedHandler implements IEventHandler<ReviewUpdatedEvent> {
  handle(event: ReviewUpdatedEvent) {
    console.log(clc.yellowBright("Async ReviewUpdatedEvent..."));
  }
}
