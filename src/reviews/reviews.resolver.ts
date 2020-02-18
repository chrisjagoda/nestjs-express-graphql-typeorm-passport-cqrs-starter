import { UseGuards } from "@nestjs/common";
import { QueryBus, CommandBus } from "@nestjs/cqrs";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { NewReviewInput } from "./dto/new-review.input";
import { ReviewsArgs } from "./dto/reviews.args";
import { Review } from "./entities/review.entity";
import { GetReviewQuery, GetReviewsQuery } from "./queries/impl";
import { CreateReviewCommand } from "./commands/impl/create-review.command";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { GqlAuthGuard } from "../auth/gql.guard";
import { UpdateReviewCommand } from "./commands/impl/update-review.command";
import { UpdateReviewInput } from "./dto/update-review.input";
import { DeleteReviewCommand } from "./commands/impl/delete-review.command";

@Resolver(() => Review)
export class ReviewsResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Query(() => Review)
  async review(@Args("id") id: string): Promise<Review> {
    return this.queryBus.execute(new GetReviewQuery(id));
  }

  @Query(() => [Review])
  async reviews(@Args() reviewsArgs: ReviewsArgs): Promise<Review[]> {
    return this.queryBus.execute(new GetReviewsQuery(reviewsArgs));
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Review)
  async createReview(
    @Args("newReviewData") newReviewData: NewReviewInput,
    @CurrentUser() user
  ): Promise<Review> {
    return this.commandBus.execute(
      new CreateReviewCommand(newReviewData, user)
    );
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Review)
  async updateReview(
    @Args("updateReviewData") updateReviewData: UpdateReviewInput,
    @CurrentUser() user
  ): Promise<Review> {
    return this.commandBus.execute(
      new UpdateReviewCommand(updateReviewData, user)
    );
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async deleteReview(
    @Args("id") id: string,
    @CurrentUser() user
  ): Promise<Review> {
    return this.commandBus.execute(new DeleteReviewCommand(id, user));
  }
}
