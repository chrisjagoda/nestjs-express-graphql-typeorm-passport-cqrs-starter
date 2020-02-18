import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UserWithToken } from "./dto/user-with-token";
import { User } from "../users/entities/user.entity";
import { NewUserInput } from "../users/dto/new-user.input";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  private SALT_ROUNDS = 10;

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ) {}

  async register(newUserInput: NewUserInput): Promise<UserWithToken> {
    newUserInput.password = await this.getHash(newUserInput.password);
    const user = await this.usersService.create(newUserInput);
    return this.createUserWithToken(user);
  }

  async login(username: string, password: string): Promise<UserWithToken> {
    const user = await this.usersService.findOneByUsername(username);
    if (!user || !(await this.isMatchingPassword(password, user.password))) {
      throw new HttpException(
        "Incorrect username or password.",
        HttpStatus.UNAUTHORIZED
      );
    }
    return this.createUserWithToken(user);
  }

  async renew(id: string): Promise<UserWithToken> {
    const user = await this.usersService.findOneById(id);
    if (!user) {
      throw new HttpException("User not found.", HttpStatus.NOT_FOUND);
    }
    return this.createUserWithToken(user);
  }

  private createUserWithToken(user: User): UserWithToken {
    const payload = { username: user.username, id: user.id };
    const token = this.jwtService.sign(payload);
    return { token, user };
  }

  private async getHash(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }

  private async isMatchingPassword(
    password: string,
    hash: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
