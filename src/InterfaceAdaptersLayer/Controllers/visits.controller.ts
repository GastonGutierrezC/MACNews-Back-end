import { Controller, Post, Body, Get, Param, NotFoundException, BadRequestException } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ActiveUser } from 'src/ApplicationLayer/decorators/active-user.decorator';
import { ActiveUserInterface } from 'src/ApplicationLayer/decorators/active-user.interface';
import { Auth } from 'src/ApplicationLayer/decorators/auth.decorators';
import { CreateVisitsDto } from 'src/ApplicationLayer/dto/ VisitsDTOs/create-visits.dto';
import { VisitCountByNewsDto } from 'src/ApplicationLayer/dto/ VisitsDTOs/visit-count-by-news.dto';
import { VisitedNewsByUserDto } from 'src/ApplicationLayer/dto/ VisitsDTOs/visited-news-by-user.dto';
import { CreateVisitsService } from 'src/ApplicationLayer/UseCases/VisitsUseCases/create.visits';
import { FindVisitsService } from 'src/ApplicationLayer/UseCases/VisitsUseCases/find.visits';
import { RoleAssigned } from 'src/DomainLayer/Entities/roles.entity';
import { VisitsEntity } from 'src/DomainLayer/Entities/visits.entity';

@ApiTags('Visits')
@Controller('visits')
export class VisitsController {
  constructor(
    private readonly createVisitsService: CreateVisitsService,
    private readonly findVisitsService: FindVisitsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new visit' })
  @ApiBody({ type: CreateVisitsDto })
  @Auth([RoleAssigned.Reader, RoleAssigned.Journalist])
  @ApiBearerAuth('access-token')
  async createVisit(@ActiveUser() user: ActiveUserInterface, @Body() createVisitsDto: CreateVisitsDto): Promise<VisitsEntity> {
    try {
      return await this.createVisitsService.create(createVisitsDto,user.userID);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('user/:userId')
  @Auth(RoleAssigned.Administrator)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get visited news by user' })
  async getVisitedNewsByUser(@Param('userId') userId: string): Promise<VisitedNewsByUserDto[]> {
    try {
      return await this.findVisitsService.getVisitedNewsByUser(userId);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }


}
