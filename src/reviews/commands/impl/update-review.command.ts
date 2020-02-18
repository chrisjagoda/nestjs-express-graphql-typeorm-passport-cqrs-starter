import { UpdateReviewInput } from "../../dto/update-review.input";
import { User } from "../../../users/entities/user.entity";

export class UpdateReviewCommand {
  constructor(
    public readonly updateReviewInput: UpdateReviewInput,
    public readonly user: User
  ) {}
}
