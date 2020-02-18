import { Field, InputType } from "type-graphql";
import { NewRecipeInput } from "./new-recipe.input";

@InputType()
export class UpdateRecipeInput extends NewRecipeInput
  implements Partial<NewRecipeInput> {
  @Field()
  id: string;
}
