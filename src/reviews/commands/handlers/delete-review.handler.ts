import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import * as clc from "cli-color";
import { ReviewsService } from "../../reviews.service";
import { DeleteReviewCommand } from "../impl/delete-review.command";
import { ReviewModel } from "src/reviews/models/review.model";
import { Review } from "../../entities/review.entity";

@CommandHandler(DeleteReviewCommand)
export class DeleteReviewHandler
  implements ICommandHandler<DeleteReviewCommand> {
  constructor(
    private readonly reviewsService: ReviewsService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: DeleteReviewCommand): Promise<Review> {
    console.log(clc.yellowBright("Async DeleteReviewCommand..."));

    const { id, user } = command;
    const review = await this.reviewsService.delete(id, user);
    const reviewModel = this.publisher.mergeObjectContext(
      new ReviewModel(review)
    );
    reviewModel.delete(user);
    reviewModel.commit();
    return review;
  }
}
