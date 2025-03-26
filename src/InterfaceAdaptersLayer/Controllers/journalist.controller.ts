import { Controller, Post, Body, Param, Get, Put,Patch } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateJournalistDto } from 'src/ApplicationLayer/dto/JournalistDTOs/create-journalist.dto';
import { UpdateJournalistDto } from 'src/ApplicationLayer/dto/JournalistDTOs/update-journalist.dto';
import { CreateJournalistService } from 'src/ApplicationLayer/UseCases/JournalistUseCases/create.journalist';
import { FindJournalistService } from 'src/ApplicationLayer/UseCases/JournalistUseCases/find.journalist';
import { UpdateJournalistService } from 'src/ApplicationLayer/UseCases/JournalistUseCases/update.journalist';
import { JournalistEntity } from 'src/DomainLayer/Entities/journalist.entity';

@ApiTags('Journalist')
@Controller('journalist')
export class JournalistController {
  constructor(
    private readonly createJournalistService:CreateJournalistService,
    private readonly updateJournalistService:UpdateJournalistService,
    private readonly findJournalistService:FindJournalistService,

  ) {}

  @Post()
  @ApiOperation({ summary: 'Creating the journalist' })
  @ApiBody({
    type: CreateJournalistDto,
  })  
  async create(@Body() createJournalistDto: CreateJournalistDto): Promise<JournalistEntity> {
    return this.createJournalistService.create(createJournalistDto);
  }

  @Patch(':id')

  @ApiOperation({ summary: 'update journalist data' })
  @ApiBody({
    type: UpdateJournalistDto, 
  })  
  async update(
    @Param('id') id: string,
    @Body() updateJournalistDto: UpdateJournalistDto,
  ): Promise<JournalistEntity> {
    return this.updateJournalistService.update(id, updateJournalistDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtain journalist by ID' })
  async findById(@Param('id') id: string): Promise<JournalistEntity> {
    return this.findJournalistService.findById(id);
  }

  
}


