import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserRecommendationDto } from 'src/ApplicationLayer/dto/UserRecommendationsDTOs/UpdateUserRecommendationDto';
import { IUserRecommendationsRepository } from 'src/InfrastructureLayer/Repositories/Interface/userRecommendations.repository.interface';

@Injectable()
export class UpdateUserRecommendationService {
  constructor(
    @Inject('IUserRecommendationsRepository')
    private readonly recommendationRepo: IUserRecommendationsRepository,
    
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