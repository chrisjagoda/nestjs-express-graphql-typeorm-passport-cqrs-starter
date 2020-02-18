import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { DateScalar } from "../../common/scalars/date.scalar";
import { Alert } from "../../alerts/entities/alert.entity";
import { Recipe } from "../../recipes/entities/recipe.entity";

@Entity()
@ObjectType()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ unique: true })
  username?: string;

  @Field()
  @Column({ unique: true })
  email?: string;

  @Field()
  @Column()
  password?: string;

  @Field(() => DateScalar)
  @Column({ default: () => "NOW()" })
  creationDate?: Date;

  @OneToMany(
    () => Alert,
    alert => alert.user
  )
  public alerts?: Alert[];

  @OneToMany(
    () => Recipe,
    recipe => recipe.user
  )
  public recipes?: Recipe[];
}
