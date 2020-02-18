import { UserWithToken } from "../../dto/user-with-token";

export class UserRegisteredEvent {
  constructor(public readonly userWithToken: UserWithToken) {}
}
