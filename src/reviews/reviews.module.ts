import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AlertsModule } from "../alerts/alerts.module";
import { DateScalar } from "../common/scalars/date.scalar";
import { ReviewsResolver } from "./reviews.resolver";
import { ReviewsService } from "./reviews.service";
import { CommandHandlers } from "./commands/handlers";
import { EventHandlers } from "./events/handlers";
import { QueryHandlers } from "./queries/handlers";
import { Review } from "./entities/review.entity";

@Module({
  imports: [AlertsModule, CqrsModule, TypeOrmModule.forFeature([Review])],
  providers: [
    ReviewsResolver,
    ReviewsService,
    DateScalar,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class ReviewsModule {}
