import { User } from "../../users/entities/user.entity";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class UserWithToken {
  @Field()
  public token: string;

  @Field(() => User)
  public user: User;
}
