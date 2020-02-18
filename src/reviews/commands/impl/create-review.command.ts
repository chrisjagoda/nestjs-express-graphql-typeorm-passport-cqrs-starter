import { NewReviewInput } from "../../dto/new-review.input";
import { User } from "../../../users/entities/user.entity";

export class CreateReviewCommand {
  constructor(
    public readonly newReviewInput: NewReviewInput,
    public readonly user: User
  ) {}
}
