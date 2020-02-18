import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { DateScalar } from "../../common/scalars/date.scalar";
import { User } from "../../users/entities/user.entity";

@Entity()
@ObjectType()
export class Recipe {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ length: 120 })
  @Field()
  title?: string;

  @Column({ type: "text", nullable: true })
  @Field({ nullable: true })
  description?: string;

  @Column({ type: "text" })
  @Field()
  directions?: string;

  @Column({ type: "simple-array" })
  @Field(() => [String])
  ingredients?: string[];

  @Column()
  @Field()
  published?: boolean;

  @Column({ default: false })
  @Field()
  archived?: boolean;

  @Column({ default: () => "NOW()" })
  @Field(() => DateScalar)
  creationDate?: Date;

  @ManyToOne(
    () => User,
    user => user.alerts
  )
  @JoinColumn()
  public user?: User;
}
