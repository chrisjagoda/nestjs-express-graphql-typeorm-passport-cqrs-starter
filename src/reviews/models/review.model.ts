import { AggregateRoot } from "@nestjs/cqrs";
import { Review } from "../entities/review.entity";
import { ReviewCreatedEvent } from "../events/impl/review-created.event";
import { ReviewUpdatedEvent } from "../events/impl/review-updated.event";
import { ReviewDeletedEvent } from "../events/impl/review-deleted.event";
import { User } from "../../users/entities/user.entity";

export class ReviewModel extends AggregateRoot {
  constructor(private readonly review: Review) {
    super();
  }

  create(user: User) {
    // logic
    this.apply(new ReviewCreatedEvent(this.review, user));
  }

  update(user: User) {
    // logic
    this.apply(new ReviewUpdatedEvent(this.review, user));
  }

  delete(user: User) {
    // logic
    this.apply(new ReviewDeletedEvent(this.review, user));
  }
}
