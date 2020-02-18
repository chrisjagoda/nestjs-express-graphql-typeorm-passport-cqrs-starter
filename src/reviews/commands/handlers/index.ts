import { CreateReviewHandler } from "./create-review.handler";
import { UpdateReviewHandler } from "./update-review.handler";
import { DeleteReviewHandler } from "./delete-review.handler";

export const CommandHandlers = [
  CreateReviewHandler,
  UpdateReviewHandler,
  DeleteReviewHandler
];
