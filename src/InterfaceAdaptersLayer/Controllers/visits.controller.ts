import { Controller, Post, Body, Get, Param, NotFoundException, BadRequestException } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateVisitsDto } from 'src/ApplicationLayer/dto/ VisitsDTOs/create-visits.dto';
import { VisitCountByNewsDto } from 'src/ApplicationLayer/dto/ VisitsDTOs/visit-count-by-news.dto';
import { VisitedNewsByUserDto } from 'src/ApplicationLayer/dto/ VisitsDTOs/visited-news-by-user.dto';
import { CreateVisitsService } from 'src/ApplicationLayer/UseCases/VisitsUseCases/create.visits';
import { FindVisitsService } from 'src/ApplicationLayer/UseCases/VisitsUseCases/find.visits';
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
  async createVisit(@Body() createVisitsDto: CreateVisitsDto): Promise<VisitsEntity> {
    try {
      return await this.createVisitsService.create(createVisitsDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get visited news by user' })
  async getVisitedNewsByUser(@Param('userId') userId: string): Promise<VisitedNewsByUserDto[]> {
    try {
      return await this.findVisitsService.getVisitedNewsByUser(userId);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get('news/:newsId')
  @ApiOperation({ summary: 'Get visit count for a specific news' })
  async getVisitCountByNews(@Param('newsId') newsId: string): Promise<VisitCountByNewsDto> {
    try {
      return await this.findVisitsService.getVisitCountByNews(newsId);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
