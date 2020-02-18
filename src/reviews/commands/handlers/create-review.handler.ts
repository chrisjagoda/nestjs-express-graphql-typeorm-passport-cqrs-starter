import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import * as clc from "cli-color";
import { ReviewsService } from "../../reviews.service";
import { CreateReviewCommand } from "../impl/create-review.command";
import { ReviewModel } from "src/reviews/models/review.model";
import { Review } from "../../entities/review.entity";

@CommandHandler(CreateReviewCommand)
export class CreateReviewHandler
  implements ICommandHandler<CreateReviewCommand> {
  constructor(
    private readonly reviewsService: ReviewsService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateReviewCommand): Promise<Review> {
    console.log(clc.yellowBright("Async CreateReviewCommand..."));

    const { newReviewInput, user } = command;
    const review = await this.reviewsService.create(newReviewInput, user);
    const reviewModel = this.publisher.mergeObjectContext(
      new ReviewModel(review)
    );
    reviewModel.create(user);
    reviewModel.commit();
    return review;
  }
}
