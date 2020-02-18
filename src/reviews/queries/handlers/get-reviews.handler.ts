import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import * as clc from "cli-color";
import { ReviewsService } from "../../reviews.service";
import { GetReviewsQuery } from "../impl";
import { Review } from "../../entities/review.entity";

@QueryHandler(GetReviewsQuery)
export class GetReviewsHandler implements IQueryHandler<GetReviewsQuery> {
  constructor(private readonly reviewsService: ReviewsService) {}

  async execute(query: GetReviewsQuery): Promise<Review[]> {
    console.log(clc.yellowBright("Async GetReviewsQuery..."));
    return this.reviewsService.findAll(query.args);
  }
}
