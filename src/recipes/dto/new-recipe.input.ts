import { IsOptional, MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class NewRecipeInput {
  @Field()
  @MaxLength(50)
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  description?: string;

  @Field()
  directions: string;

  @Field()
  published: boolean;

  @Field(() => [String])
  ingredients: string[];
}
