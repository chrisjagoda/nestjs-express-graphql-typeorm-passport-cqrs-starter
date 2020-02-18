import { AggregateRoot } from "@nestjs/cqrs";
import { Recipe } from "../entities/recipe.entity";
import { RecipeSharedEvent } from "../events/impl/recipe-shared.event";
import { RecipeCreatedEvent } from "../events/impl/recipe-created.event";
import { RecipeUpdatedEvent } from "../events/impl/recipe-updated.event";
import { RecipeDeletedEvent } from "../events/impl/recipe-deleted.event";
import { User } from "../../users/entities/user.entity";

export class RecipeModel extends AggregateRoot {
  constructor(private readonly recipe: Recipe) {
    super();
  }

  create(user: User) {
    // logic
    this.apply(new RecipeCreatedEvent(this.recipe, user));
  }

  update(user: User) {
    // logic
    this.apply(new RecipeUpdatedEvent(this.recipe, user));
  }

  delete(user: User) {
    // logic
    this.apply(new RecipeDeletedEvent(this.recipe, user));
  }

  share(user: User) {
    // logic
    this.apply(new RecipeSharedEvent(this.recipe.id, user));
  }
}
