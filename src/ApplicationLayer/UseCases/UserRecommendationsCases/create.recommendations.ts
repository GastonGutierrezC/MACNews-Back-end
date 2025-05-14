import { Injectable } from '@nestjs/common';
import { CreateUserRecommendationDto } from 'src/ApplicationLayer/dto/UserRecommendationsDTOs/CreateUserRecommendationDto';
import { GetUserRecommendationsDto } from 'src/ApplicationLayer/dto/UserRecommendationsDTOs/GetUserRecommendationsDto';
import { UserRecommendationsEntity } from 'src/DomainLayer/Entities/userRecommendations.entity';
import { UserRecommendationsRepository } from 'src/InfrastructureLayer/Repositories/userRecommendations.repository';


@Injectable()
export class CreateUserRecommendationService {
  constructor(
    private readonly recommendationRepo: UserRecommendationsRepository,
  ) {}

  async create(data: CreateUserRecommendationDto): Promise<GetUserRecommendationsDto> {
    const recommendation = await this.recommendationRepo.create({
      UserID: data.UserID,
      NewsArticleIDs: [],
    });

    const response: GetUserRecommendationsDto = {
      NewsArticleIDs: recommendation.NewsArticleIDs,
    };

    return response;
  }
}
