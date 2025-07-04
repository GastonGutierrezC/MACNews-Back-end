import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserRecommendationDto } from 'src/ApplicationLayer/dto/UserRecommendationsDTOs/UpdateUserRecommendationDto';
import { GetUserRecommendationsDto } from 'src/ApplicationLayer/dto/UserRecommendationsDTOs/GetUserRecommendationsDto';
import { UpdateUserRecommendationService } from 'src/ApplicationLayer/UseCases/UserRecommendationsCases/update.recommendations';
import { FindUserRecommendationService } from 'src/ApplicationLayer/UseCases/UserRecommendationsCases/find.recommendations';
import { Auth } from 'src/ApplicationLayer/decorators/auth.decorators';
import { RoleAssigned } from 'src/DomainLayer/Entities/roles.entity';
import { ActiveUser } from 'src/ApplicationLayer/decorators/active-user.decorator';
import { ActiveUserInterface } from 'src/ApplicationLayer/decorators/active-user.interface';

@ApiTags('UserRecommendations')
@Controller('recommendations')
export class UserRecommendationsController {
  constructor(
    private readonly findRecommendationService: FindUserRecommendationService,
    private readonly updateRecommendationService: UpdateUserRecommendationService,
  ) {}

  @Get('user')
  @ApiOperation({ summary: 'Get recommendations for a specific user' })
@Auth([RoleAssigned.Reader, RoleAssigned.Journalist])
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 200,
    description: 'Returns user recommendations (only NewsArticleIDs)',
    type: GetUserRecommendationsDto,
  })
  async findOne(@ActiveUser() user: ActiveUserInterface): Promise<GetUserRecommendationsDto> {
    return await this.findRecommendationService.getByUserId(user.userID);
  }

  @Patch('')
  @ApiOperation({ summary: 'Update recommendations for a specific user' })
  @ApiBody({ type: UpdateUserRecommendationDto })
    @Auth(RoleAssigned.Administrator)
  @ApiBearerAuth('access-token')
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
