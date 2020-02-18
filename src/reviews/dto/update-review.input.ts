import { Field, InputType } from "type-graphql";
import { NewReviewInput } from "./new-review.input";

@InputType()
export class UpdateReviewInput extends NewReviewInput
  implements Partial<NewReviewInput> {
  @Field()
  id: string;
}
