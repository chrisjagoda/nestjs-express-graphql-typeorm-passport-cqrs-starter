import { UserWithToken } from "../../dto/user-with-token";

export class UserLoggedInEvent {
  constructor(public readonly userWithToken: UserWithToken) {}
}
