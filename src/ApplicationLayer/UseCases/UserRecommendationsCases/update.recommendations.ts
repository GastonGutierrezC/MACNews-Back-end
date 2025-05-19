import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRecommendationsRepository } from 'src/InfrastructureLayer/Repositories/userRecommendations.repository';
import { UpdateUserRecommendationDto } from 'src/ApplicationLayer/dto/UserRecommendationsDTOs/UpdateUserRecommendationDto';

@Injectable()
export class UpdateUserRecommendationService {
  constructor(
    private readonly recommendationRepo: UserRecommendationsRepository,
  ) {}

  async update(data: UpdateUserRecommendationDto): Promise<UpdateUserRecommendationDto> {
    const allRecommendations = await this.recommendationRepo.findAll();

    const recommendation = allRecommendations.find(
      (rec) => rec.UserID === data.UserID,
    );

    if (!recommendation) {
      throw new NotFoundException('Recommendation for user not found.');
    }

    await this.recommendationRepo.update(recommendation.RecommendationID, {
      NewsArticleIDs: data.NewsArticleIDs,
    });


    return {
      UserID: data.UserID,
      NewsArticleIDs: data.NewsArticleIDs,
    };
  }
}


// recommendationRepo.findAll