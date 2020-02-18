import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import * as clc from "cli-color";
import { AlertsService } from "../../alerts.service";
import { RecipePublishedAlertCommand } from "../impl/recipe-published-alert.command";
import { AlertModel } from "../../models/alert.model";

@CommandHandler(RecipePublishedAlertCommand)
export class RecipePublishedAlertHandler
  implements ICommandHandler<RecipePublishedAlertCommand> {
  constructor(
    private readonly alertsService: AlertsService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RecipePublishedAlertCommand) {
    console.log(clc.yellowBright("Async RecipePublishedAlertCommand..."));

    const { recipe, user } = command;
    const alert = this.publisher.mergeObjectContext(
      new AlertModel(await this.alertsService.alert(recipe, user))
    );
    alert.send(user);
    alert.commit();
  }
}
