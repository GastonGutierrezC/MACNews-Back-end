import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ActiveUser } from 'src/ApplicationLayer/decorators/active-user.decorator';
import { ActiveUserInterface } from 'src/ApplicationLayer/decorators/active-user.interface';
import { Auth } from 'src/ApplicationLayer/decorators/auth.decorators';
import { CreateSearchHistoryDto } from 'src/ApplicationLayer/dto/SearchHistoryDTOs/create-searchHistory.dto';
import { FindSearchHistoryDto } from 'src/ApplicationLayer/dto/SearchHistoryDTOs/find-searchHistory.dto';
import { CreateSearchHistoryService } from 'src/ApplicationLayer/UseCases/SearchHistoryUseCases/create.searchHistory';
import { FindSearchHistoryService } from 'src/ApplicationLayer/UseCases/SearchHistoryUseCases/find.searchHistory';
import { RoleAssigned } from 'src/DomainLayer/Entities/roles.entity';
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
  @Auth([RoleAssigned.Reader, RoleAssigned.Journalist])
  @ApiBearerAuth('access-token')
  @ApiBody({
    type: CreateSearchHistoryDto, 
  })
  async create(@ActiveUser() user: ActiveUserInterface,@Body() createSearchHistoryDto: CreateSearchHistoryDto): Promise<boolean> {
    return this.createSearchHistoryService.create(createSearchHistoryDto, user.userID);
  }


  @Get('user')
  @Auth([RoleAssigned.Reader, RoleAssigned.Journalist])
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get search history by user ID' })
  async findByUserId(@ActiveUser() user: ActiveUserInterface,): Promise<FindSearchHistoryDto[]> {
    return this.findSearchHistoryService.findByUserId(user.userID);
  }


  @Get('userHistory/:id')
  @Auth(RoleAssigned.Administrator)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get search history by user ID' })

  
  async findByUser(@Param('id') id: string): Promise<FindSearchHistoryDto[]> {
    return this.findSearchHistoryService.findByUserId(id);
  }
}
