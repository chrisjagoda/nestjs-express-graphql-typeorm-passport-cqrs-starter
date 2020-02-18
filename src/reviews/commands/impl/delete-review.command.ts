import { User } from "../../../users/entities/user.entity";

export class DeleteReviewCommand {
  constructor(public readonly id: string, public readonly user: User) {}
}
