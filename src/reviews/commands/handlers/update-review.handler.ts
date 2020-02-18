import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import * as clc from "cli-color";
import { ReviewsService } from "../../reviews.service";
import { UpdateReviewCommand } from "../impl/update-review.command";
import { ReviewModel } from "src/reviews/models/review.model";
import { Review } from "../../entities/review.entity";

@CommandHandler(UpdateReviewCommand)
export class UpdateReviewHandler
  implements ICommandHandler<UpdateReviewCommand> {
  constructor(
    private readonly reviewsService: ReviewsService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateReviewCommand): Promise<Review> {
    console.log(clc.yellowBright("Async UpdateReviewCommand..."));

    const { updateReviewInput, user } = command;
    const review = await this.reviewsService.update(updateReviewInput, user);
    const reviewModel = this.publisher.mergeObjectContext(
      new ReviewModel(review)
    );
    reviewModel.update(user);
    reviewModel.commit();
    return review;
  }
}
