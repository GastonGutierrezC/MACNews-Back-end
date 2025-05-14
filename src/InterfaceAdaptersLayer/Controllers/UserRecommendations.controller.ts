import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserRecommendationDto } from 'src/ApplicationLayer/dto/UserRecommendationsDTOs/UpdateUserRecommendationDto';
import { GetUserRecommendationsDto } from 'src/ApplicationLayer/dto/UserRecommendationsDTOs/GetUserRecommendationsDto';
import { UpdateUserRecommendationService } from 'src/ApplicationLayer/UseCases/UserRecommendationsCases/update.recommendations';
import { FindUserRecommendationService } from 'src/ApplicationLayer/UseCases/UserRecommendationsCases/find.recommendations';

@ApiTags('UserRecommendations')
@Controller('recommendations')
export class UserRecommendationsController {
  constructor(
    private readonly findRecommendationService: FindUserRecommendationService,
    private readonly updateRecommendationService: UpdateUserRecommendationService,
  ) {}

  @Get(':userId')
  @ApiOperation({ summary: 'Get recommendations for a specific user' })
  @ApiResponse({
    status: 200,
    description: 'Returns user recommendations (only NewsArticleIDs)',
    type: GetUserRecommendationsDto,
  })
  async findOne(@Param('userId') userId: string): Promise<GetUserRecommendationsDto> {
    return await this.findRecommendationService.getByUserId(userId);
  }

  @Patch('')
  @ApiOperation({ summary: 'Update recommendations for a specific user' })
  @ApiBody({ type: UpdateUserRecommendationDto })
  @ApiResponse({
    status: 200,
    description: 'Updated list of recommended NewsArticleIDs',
    type: GetUserRecommendationsDto,
  })
  async update(
    @Body() updateDto: UpdateUserRecommendationDto,
  ): Promise<GetUserRecommendationsDto> {
    const updated = await this.updateRecommendationService.update({
      UserID: updateDto.UserID,
      NewsArticleIDs: updateDto.NewsArticleIDs,
    });
  
    return {
      NewsArticleIDs: updated.NewsArticleIDs,
    };
  }
  
}
