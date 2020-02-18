import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Connection, FindManyOptions } from "typeorm";
import { UsersArgs } from "./dto/users.args";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  private RESOURCE = "user";
  private FIND_ALL_CACHE_KEY = `${this.RESOURCE}s`;
  private FIND_ONE_CACHE_KEY = (id: string) => `${this.RESOURCE}:${id}`;
  private TTL_IN_MILLISECONDS = 30000;

  constructor(
    private readonly connection: Connection,
    @InjectRepository(User)
    private readonly repository: Repository<User>
  ) {}

  async findOneById(id: string): Promise<User> {
    const findManyOptions: FindManyOptions = {
      where: { id },
      cache: {
        id: this.FIND_ONE_CACHE_KEY(id),
        milliseconds: this.TTL_IN_MILLISECONDS
      }
    };
    const records = await this.repository.find(findManyOptions);
    if (!records.length) {
      throw new NotFoundException(`${this.RESOURCE} id: ${id} not found.`);
    }
    return records[0];
  }

  async findOneByUsername(username: string): Promise<User> {
    const record = await this.repository.findOne({ username });
    if (!record) {
      throw new NotFoundException(
        `${this.RESOURCE} username: ${username} not found.`
      );
    }
    return record;
  }

  async findAll(usersArgs: UsersArgs): Promise<User[]> {
    const findManyOptions: FindManyOptions = Object.assign(
      {
        cache: {
          id: this.FIND_ALL_CACHE_KEY,
          milliseconds: this.TTL_IN_MILLISECONDS
        }
      },
      usersArgs
    );
    const records = await this.repository.find(findManyOptions);
    if (!records.length) {
      throw new NotFoundException(`No ${this.RESOURCE}s found.`);
    }
    return records;
  }

  async create(data: { [key: string]: any }): Promise<User> {
    const saveData = this.repository.create(data);
    const savedRecord = await this.repository.save(saveData);
    await this.connection.queryResultCache.remove([this.FIND_ALL_CACHE_KEY]);
    return savedRecord;
  }

  async delete(data: { [key: string]: any }, user: User): Promise<User> {
    const id = data.id;
    const userId = user.id;
    const record = await this.findOneById(id);
    if (record.id !== userId) {
      throw new UnauthorizedException(
        `${this.RESOURCE} id: ${userId} not allowed to delete ${this.RESOURCE} id: ${id}.`
      );
    }
    const removedRecord = await this.repository.remove(record);
    await this.connection.queryResultCache.remove([
      this.FIND_ALL_CACHE_KEY,
      this.FIND_ONE_CACHE_KEY(id)
    ]);
    return removedRecord;
  }
}
