import { UseGuards } from "@nestjs/common";
import { QueryBus, CommandBus } from "@nestjs/cqrs";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { NewRecipeInput } from "./dto/new-recipe.input";
import { RecipesArgs } from "./dto/recipes.args";
import { Recipe } from "./entities/recipe.entity";
import { GetRecipeQuery, GetRecipesQuery } from "./queries/impl";
import { CreateRecipeCommand } from "./commands/impl/create-recipe.command";
import { ShareRecipeCommand } from "./commands/impl/share-recipe.command";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { GqlAuthGuard } from "../auth/gql.guard";
import { UpdateRecipeCommand } from "./commands/impl/update-recipe.command";
import { UpdateRecipeInput } from "./dto/update-recipe.input";
import { DeleteRecipeCommand } from "./commands/impl/delete-recipe.command";

@Resolver(() => Recipe)
export class RecipesResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Query(() => Recipe)
  async recipe(@Args("id") id: string): Promise<Recipe> {
    return this.queryBus.execute(new GetRecipeQuery(id));
  }

  @Query(() => [Recipe])
  async recipes(@Args() recipesArgs: RecipesArgs): Promise<Recipe[]> {
    return this.queryBus.execute(new GetRecipesQuery(recipesArgs));
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Recipe)
  async createRecipe(
    @Args("newRecipeData") newRecipeData: NewRecipeInput,
    @CurrentUser() user
  ): Promise<Recipe> {
    return this.commandBus.execute(
      new CreateRecipeCommand(newRecipeData, user)
    );
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Recipe)
  async updateRecipe(
    @Args("updateRecipeData") updateRecipeData: UpdateRecipeInput,
    @CurrentUser() user
  ): Promise<Recipe> {
    return this.commandBus.execute(
      new UpdateRecipeCommand(updateRecipeData, user)
    );
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async deleteRecipe(
    @Args("id") id: string,
    @CurrentUser() user
  ): Promise<Recipe> {
    return this.commandBus.execute(new DeleteRecipeCommand(id, user));
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async shareRecipe(
    @Args("id") id: string,
    @CurrentUser() user
  ): Promise<Recipe> {
    return this.commandBus.execute(new ShareRecipeCommand(id, user));
  }
}
