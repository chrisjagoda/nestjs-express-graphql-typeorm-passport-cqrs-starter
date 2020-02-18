import { Review } from "../../entities/review.entity";
import { User } from "../../../users/entities/user.entity";

export class ReviewDeletedEvent {
  constructor(public readonly review: Review, public readonly user: User) {}
}
