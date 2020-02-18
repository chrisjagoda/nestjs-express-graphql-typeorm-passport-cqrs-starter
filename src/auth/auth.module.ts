import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { DateScalar } from "../common/scalars/date.scalar";
import { CommandHandlers } from "./commands/handlers";
import { EventHandlers } from "./events/handlers";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [
    CqrsModule,
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "60s" }
    })
  ],
  providers: [
    AuthResolver,
    AuthService,
    JwtStrategy,
    DateScalar,
    ...CommandHandlers,
    ...EventHandlers
  ],
  exports: [AuthService]
})
export class AuthModule {}
