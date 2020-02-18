import { Injectable } from "@nestjs/common";
import { ICommand, ofType, Saga } from "@nestjs/cqrs";
import * as clc from "cli-color";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RecipePublishedAlertCommand } from "../../alerts/commands/impl/recipe-published-alert.command";
import { RecipeCreatedEvent } from "../events/impl/recipe-created.event";

@Injectable()
export class RecipesSaga {
  @Saga()
  recipeCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(RecipeCreatedEvent),
      map(event => {
        console.log(clc.redBright("Inside [RecipesSaga] Saga"));
        return new RecipePublishedAlertCommand(event.recipe, event.user);
      })
    );
  };
}
