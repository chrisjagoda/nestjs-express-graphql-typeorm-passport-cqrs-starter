import {
  IsString,
  MinLength,
  MaxLength,
  NotContains,
  IsDefined
} from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class LoginUserInput {
  @Field()
  @IsDefined()
  public username: string;

  @Field()
  @IsString()
  @MinLength(8)
  @MaxLength(24)
  @NotContains(" ", { message: "No spaces allowed" })
  @IsDefined()
  public password: string;
}
