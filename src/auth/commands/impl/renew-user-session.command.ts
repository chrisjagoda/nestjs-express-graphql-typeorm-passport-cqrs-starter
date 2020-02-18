import { Payload } from "src/auth/dto/payload";

export class RenewUserSessionCommand {
  constructor(public readonly payload: Payload) {}
}
