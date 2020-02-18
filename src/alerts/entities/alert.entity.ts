import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { DateScalar } from "../../common/scalars/date.scalar";
import { User } from "../../users/entities/user.entity";

@Entity()
@ObjectType()
export class Alert {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column("text")
  message: string;

  @Field(() => DateScalar)
  @Column({ default: () => "NOW()" })
  creationDate: Date;

  @ManyToOne(
    () => User,
    user => user.alerts
  )
  @JoinColumn()
  public user?: User;
}
