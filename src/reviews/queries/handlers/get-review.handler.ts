import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import * as clc from "cli-color";
import { ReviewsService } from "../../reviews.service";
import { GetReviewQuery } from "../impl";
import { Review } from "../../entities/review.entity";

@QueryHandler(GetReviewQuery)
export class GetReviewHandler implements IQueryHandler<GetReviewQuery> {
  constructor(private readonly reviewsService: ReviewsService) {}

  async execute(query: GetReviewQuery): Promise<Review> {
    console.log(clc.yellowBright("Async GetReviewQuery..."));
    return this.reviewsService.findOneById(query.id);
  }
}
