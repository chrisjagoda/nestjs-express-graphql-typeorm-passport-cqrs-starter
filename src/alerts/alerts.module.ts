import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { AlertsService } from "./alerts.service";
import { CommandHandlers } from "./commands/handlers";
import { EventHandlers } from "./events/handlers";

@Module({
  imports: [CqrsModule],
  providers: [AlertsService, ...CommandHandlers, ...EventHandlers]
})
export class AlertsModule {}
