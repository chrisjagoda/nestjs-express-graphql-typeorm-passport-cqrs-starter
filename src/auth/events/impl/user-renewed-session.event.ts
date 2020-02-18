import { UserWithToken } from "../../dto/user-with-token";

export class UserRenewedSessionEvent {
  constructor(public readonly userWithToken: UserWithToken) {}
}
