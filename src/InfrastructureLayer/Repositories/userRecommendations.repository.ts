import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRecommendationsEntity } from '../../DomainLayer/Entities/userRecommendations.entity';

@Injectable()
export class UserRecommendationsRepository {
  constructor(
    @InjectRepository(UserRecommendationsEntity)
    private readonly recommendationRepo: Repository<UserRecommendationsEntity>,
  ) {}

  async findAll(): Promise<UserRecommendationsEntity[]> {
    return await this.recommendationRepo.find({ relations: ['user'] });
  }

  async findById(RecommendationID: string): Promise<UserRecommendationsEntity | undefined> {
    return await this.recommendationRepo.findOne({
      where: { RecommendationID },
      relations: ['user'],
    });
  }

  async findByUserId(UserID: string): Promise<UserRecommendationsEntity | null> {
    return await this.recommendationRepo.findOne({ where: { UserID } });
  }
  

  async create(recommendationData: Partial<UserRecommendationsEntity>): Promise<UserRecommendationsEntity> {
    const newRecommendation = this.recommendationRepo.create(recommendationData);
    return await this.recommendationRepo.save(newRecommendation);
  }

  async update(RecommendationID: string, updateData: Partial<UserRecommendationsEntity>): Promise<void> {
    await this.recommendationRepo.update(RecommendationID, updateData);
  }
}
