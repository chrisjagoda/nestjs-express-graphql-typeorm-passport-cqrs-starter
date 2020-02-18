import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import * as clc from "cli-color";
import { ReviewDeletedEvent } from "../impl/review-deleted.event";

@EventsHandler(ReviewDeletedEvent)
export class ReviewDeletedHandler implements IEventHandler<ReviewDeletedEvent> {
  handle(event: ReviewDeletedEvent) {
    console.log(clc.yellowBright("Async ReviewDeletedEvent..."));
  }
}
