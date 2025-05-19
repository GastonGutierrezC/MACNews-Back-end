import { Injectable, NotFoundException } from '@nestjs/common';
import { GetUserRecommendationsDto } from 'src/ApplicationLayer/dto/UserRecommendationsDTOs/GetUserRecommendationsDto';
import { UserRecommendationsRepository } from 'src/InfrastructureLayer/Repositories/userRecommendations.repository';


@Injectable()
export class FindUserRecommendationService {
  constructor(
    private readonly recommendationRepo: UserRecommendationsRepository,
  ) {}

  async getByUserId(UserID: string): Promise<GetUserRecommendationsDto> {
    const entity = await this.recommendationRepo.findByUserId(UserID);

    if (!entity) {
      throw new NotFoundException('Recommendation not found for this user.');
    }

    return {
      NewsArticleIDs: entity.NewsArticleIDs,
    };
  }
}
