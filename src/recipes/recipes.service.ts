import {
  Injectable,
  HttpStatus,
  NotFoundException,
  UnauthorizedException
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Connection, Repository, FindManyOptions } from "typeorm";
import { RecipesArgs } from "./dto/recipes.args";
import { Recipe } from "./entities/recipe.entity";
import { User } from "../users/entities/user.entity";

@Injectable()
export class RecipesService {
  private RESOURCE = "recipe";
  private FIND_ALL_CACHE_KEY = `${this.RESOURCE}s`;
  private FIND_ONE_CACHE_KEY = (id: string) => `${this.RESOURCE}:${id}`;
  private TTL_IN_MILLISECONDS = 30000;

  constructor(
    private readonly connection: Connection,
    @InjectRepository(Recipe)
    private readonly repository: Repository<Recipe>
  ) {}

  async findOneById(id: string): Promise<Recipe> {
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

  async findAll(recipesArgs: RecipesArgs): Promise<Recipe[]> {
    const findManyOptions: FindManyOptions = Object.assign(
      {
        cache: {
          id: this.FIND_ALL_CACHE_KEY,
          milliseconds: this.TTL_IN_MILLISECONDS
        }
      },
      recipesArgs
    );
    const records = await this.repository.find(findManyOptions);
    if (!records.length) {
      throw new NotFoundException(`No ${this.RESOURCE}s found.`);
    }
    return records;
  }

  async create(data: { [key: string]: any }, user: User): Promise<Recipe> {
    const mergedData = this.repository.merge(data, user);
    const saveData = this.repository.create(mergedData);
    const savedRecord = await this.repository.save(saveData);
    await this.connection.queryResultCache.remove([this.FIND_ALL_CACHE_KEY]);
    return savedRecord;
  }

  async update(data: { [key: string]: any }, user: User): Promise<Recipe> {
    const id = data.id;
    const userId = user.id;
    const record = await this.findOneById(id);
    if (record.user.id !== userId) {
      throw new UnauthorizedException(
        `User id: ${userId} not allowed to update ${this.RESOURCE} id: ${id}.`
      );
    }
    const updateData = this.repository.create(data);
    const updatedRecord = await this.repository.save(updateData);
    await this.connection.queryResultCache.remove([
      this.FIND_ALL_CACHE_KEY,
      this.FIND_ONE_CACHE_KEY(id)
    ]);
    return updatedRecord;
  }

  async delete(id: string, user: User): Promise<Recipe> {
    const userId = user.id;
    const record = await this.findOneById(id);
    if (record.user.id !== userId) {
      throw new UnauthorizedException(
        `User id: ${userId} not allowed to delete ${this.RESOURCE} id: ${id}.`
      );
    }
    const removedRecord = await this.repository.remove(record);
    await this.connection.queryResultCache.remove([
      this.FIND_ALL_CACHE_KEY,
      this.FIND_ONE_CACHE_KEY(id)
    ]);
    return removedRecord;
  }

  async share(id: string, user: User): Promise<Recipe> {
    const record = await this.findOneById(id);
    return record;
  }
}
