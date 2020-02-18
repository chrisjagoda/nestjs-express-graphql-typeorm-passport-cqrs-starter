import { Injectable } from "@nestjs/common";
import * as clc from "cli-color";
import { User } from "../users/entities/user.entity";

@Injectable()
export class AlertsService {
  async alert(data: any, user: User): Promise<any> {
    console.log(
      clc.redBright(
        `user: ${JSON.stringify(user)}, data: ${JSON.stringify(data)}`
      )
    );
  }
}
