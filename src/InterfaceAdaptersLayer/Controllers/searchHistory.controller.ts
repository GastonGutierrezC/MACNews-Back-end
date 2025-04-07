import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateSearchHistoryDto } from 'src/ApplicationLayer/dto/SearchHistoryDTOs/create-searchHistory.dto';
import { FindSearchHistoryDto } from 'src/ApplicationLayer/dto/SearchHistoryDTOs/find-searchHistory.dto';
import { CreateSearchHistoryService } from 'src/ApplicationLayer/UseCases/SearchHistoryUseCases/create.searchHistory';
import { FindSearchHistoryService } from 'src/ApplicationLayer/UseCases/SearchHistoryUseCases/find.searchHistory';
import { SearchHistoryEntity } from 'src/DomainLayer/Entities/SearchHistory.entity';


@ApiTags('SearchHistory')
@Controller('searchHistory')
export class SearchHistoryController {
  constructor(
    private readonly createSearchHistoryService: CreateSearchHistoryService,
    private readonly findSearchHistoryService: FindSearchHistoryService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new search history record' })
  @ApiBody({
    type: CreateSearchHistoryDto, 
  })
  async create(@Body() createSearchHistoryDto: CreateSearchHistoryDto): Promise<SearchHistoryEntity> {
    return this.createSearchHistoryService.create(createSearchHistoryDto);
  }


  @Get('user/:id')
  @ApiOperation({ summary: 'Get search history by user ID' })
  async findByUserId(@Param('id') id: string): Promise<FindSearchHistoryDto[]> {
    return this.findSearchHistoryService.findByUserId(id);
  }
}
