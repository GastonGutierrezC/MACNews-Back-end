import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { GetUserRecommendationsDto } from 'src/ApplicationLayer/dto/UserRecommendationsDTOs/GetUserRecommendationsDto';
import { IUserRecommendationsRepository } from 'src/InfrastructureLayer/Repositories/Interface/userRecommendations.repository.interface';

@Injectable()
export class FindUserRecommendationService {
  constructor(
    @Inject('IUserRecommendationsRepository')
    private readonly recommendationRepo: IUserRecommendationsRepository,
    
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
