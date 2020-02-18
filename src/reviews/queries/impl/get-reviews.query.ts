import { ReviewsArgs } from "../../dto/reviews.args";

export class GetReviewsQuery {
  constructor(public readonly args: ReviewsArgs) {}
}
