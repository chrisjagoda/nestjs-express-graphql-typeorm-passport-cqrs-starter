import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Connection, Repository, FindManyOptions } from "typeorm";
import { ReviewsArgs } from "./dto/reviews.args";
import { Review } from "./entities/review.entity";
import { User } from "../users/entities/user.entity";

@Injectable()
export class ReviewsService {
  private RESOURCE = "review";
  private FIND_ALL_CACHE_KEY = `${this.RESOURCE}s`;
  private FIND_ONE_CACHE_KEY = (id: string) => `${this.RESOURCE}:${id}`;
  private TTL_IN_MILLISECONDS = 30000;

  constructor(
    private readonly connection: Connection,
    @InjectRepository(Review)
    private readonly repository: Repository<Review>
  ) {}

  async findOneById(id: string): Promise<Review> {
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

  async findAll(reviewsArgs: ReviewsArgs): Promise<Review[]> {
    const findManyOptions: FindManyOptions = Object.assign(
      {
        cache: {
          id: this.FIND_ALL_CACHE_KEY,
          milliseconds: this.TTL_IN_MILLISECONDS
        }
      },
      reviewsArgs
    );
    const records = await this.repository.find(findManyOptions);
    if (!records.length) {
      throw new NotFoundException(`No ${this.RESOURCE}s found.`);
    }
    return records;
  }

  async create(data: { [key: string]: any }, user: User): Promise<Review> {
    const mergedData = this.repository.merge(data, user);
    const saveData = this.repository.create(mergedData);
    const savedRecord = await this.repository.save(saveData);
    await this.connection.queryResultCache.remove([this.FIND_ALL_CACHE_KEY]);
    return savedRecord;
  }

  async update(data: { [key: string]: any }, user: User): Promise<Review> {
    const id = data.id;
    const userId = user.id;
    const record = await this.findOneById(id);
    if (record.user.id !== userId) {
      throw new UnauthorizedException(
        `${this.RESOURCE} id: ${userId} not allowed to update ${this.RESOURCE} id: ${id}.`
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

  async delete(id: string, user: User): Promise<Review> {
    const userId = user.id;
    const record = await this.findOneById(id);
    if (record.user.id !== userId) {
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

  async share(id: string, user: User): Promise<Review> {
    const record = await this.findOneById(id);
    return record;
  }
}
