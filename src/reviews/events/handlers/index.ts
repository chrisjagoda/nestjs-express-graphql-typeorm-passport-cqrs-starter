import { ReviewCreatedHandler } from "./review-created.handler";
import { ReviewUpdatedHandler } from "./review-updated.handler";
import { ReviewDeletedHandler } from "./review-deleted.handler";

export const EventHandlers = [
  ReviewCreatedHandler,
  ReviewUpdatedHandler,
  ReviewDeletedHandler
];
