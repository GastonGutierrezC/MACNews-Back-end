import { Inject, Injectable } from '@nestjs/common';
import { CreateUserRecommendationDto } from 'src/ApplicationLayer/dto/UserRecommendationsDTOs/CreateUserRecommendationDto';
import { GetUserRecommendationsDto } from 'src/ApplicationLayer/dto/UserRecommendationsDTOs/GetUserRecommendationsDto';
import { IUserRecommendationsRepository } from 'src/InfrastructureLayer/Repositories/Interface/userRecommendations.repository.interface';


@Injectable()
export class CreateUserRecommendationService {
  constructor(
    @Inject('IUserRecommendationsRepository')
    private readonly recommendationRepo: IUserRecommendationsRepository,

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
