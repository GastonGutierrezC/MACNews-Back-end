import { Controller, Post, Body, Param, Patch, Delete, Get, NotFoundException, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

import { NewsTopDto } from 'src/ApplicationLayer/dto/NewsDTOs/findTopNews.dto';

import { FindNewsService } from 'src/ApplicationLayer/UseCases/NewsUseCases/find.news';

@ApiTags('News2')
@Controller('news2')
export class SimpleNewsController {
  constructor(

    private readonly findNewsService: FindNewsService,

  ) {}

  @Get('one')
  @ApiOperation({ summary: 'Get all news summarized (ID, Title, Category)' })
  async getAllSummarized(): Promise<NewsTopDto[]> {
    return this.findNewsService.getAllSummarized();
  }
}
