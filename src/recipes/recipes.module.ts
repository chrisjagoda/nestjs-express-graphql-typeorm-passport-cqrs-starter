import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AlertsModule } from "../alerts/alerts.module";
import { DateScalar } from "../common/scalars/date.scalar";
import { RecipesResolver } from "./recipes.resolver";
import { RecipesService } from "./recipes.service";
import { CommandHandlers } from "./commands/handlers";
import { EventHandlers } from "./events/handlers";
import { QueryHandlers } from "./queries/handlers";
import { RecipesSaga } from "./sagas/recipes.sagas";
import { Recipe } from "./entities/recipe.entity";

@Module({
  imports: [AlertsModule, CqrsModule, TypeOrmModule.forFeature([Recipe])],
  providers: [
    RecipesResolver,
    RecipesService,
    DateScalar,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    RecipesSaga
  ]
})
export class RecipesModule {}
