import { UserRecommendationsEntity } from 'src/DomainLayer/Entities/userRecommendations.entity';

export interface IUserRecommendationsRepository {
  findAll(): Promise<UserRecommendationsEntity[]>;
  findByUserId(UserID: string): Promise<UserRecommendationsEntity | null>;
  create(recommendationData: Partial<UserRecommendationsEntity>): Promise<UserRecommendationsEntity>;  
  update(RecommendationID: string, updateData: Partial<UserRecommendationsEntity>): Promise<void>;

}
