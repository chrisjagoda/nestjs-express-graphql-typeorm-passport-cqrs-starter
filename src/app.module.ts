import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { AuthModule } from "./auth/auth.module";
import { RecipesModule } from "./recipes/recipes.module";
import { UsersModule } from "./users/users.module";
import { AlertsModule } from "./alerts/alerts.module";

@Module({
  imports: [
    AlertsModule,
    AuthModule,
    RecipesModule,
    UsersModule,
    GraphQLModule.forRoot({
      context: ({ req }) => ({ req }),
      installSubscriptionHandlers: true,
      autoSchemaFile: "schema.gql"
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [join(__dirname, "**/**.entity{.ts,.js}")],
      synchronize: true,
      cache: {
        type: "redis",
        options: {
          host: process.env.REDIS_HOST,
          port: Number(process.env.REDIS_PORT)
        }
      }
    })
  ]
})
export class ApplicationModule {}
