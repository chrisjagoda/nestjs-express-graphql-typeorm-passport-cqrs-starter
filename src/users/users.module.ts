import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";
import { DateScalar } from "../common/scalars/date.scalar";
import { CommandHandlers } from "./commands/handlers";
import { EventHandlers } from "./events/handlers";
import { QueryHandlers } from "./queries/handlers";

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([User])],
  providers: [
    UsersResolver,
    UsersService,
    DateScalar,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ],
  exports: [UsersService]
})
export class UsersModule {}
