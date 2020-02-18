import {
  IsOptional,
  Length,
  MaxLength,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  NotContains
} from "class-validator";
import { Field, InputType } from "type-graphql";
import { User } from "../entities/user.entity";

@InputType()
export class NewUserInput implements Partial<User> {
  @Field()
  @MaxLength(30)
  @NotContains(" ", { message: "No spaces allowed" })
  @IsNotEmpty()
  public username: string;

  @Field()
  @IsEmail()
  @IsDefined()
  public email: string;

  @Field()
  @Length(8, 48)
  @NotContains(" ", { message: "No spaces allowed" })
  @IsOptional()
  public password: string;
}
