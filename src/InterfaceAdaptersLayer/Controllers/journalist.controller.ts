import { Controller, Post, Body, Param, Get, Put,Patch } from '@nestjs/common';

import { JournalistEntity } from '../../DomainLayer/Entities/journalist.entity';
import { CreateJournalistDto } from 'src/ApplicationLayer/dto/JournalistDTOs/create-journalist.dto';
import { UpdateJournalistDto } from 'src/ApplicationLayer/dto/JournalistDTOs/update-journalist.dto';
import { JournalistService } from 'src/ApplicationLayer/UseCases/journalist.service';
import { UpdateJournalistVerificationDto } from 'src/ApplicationLayer/dto/JournalistDTOs/update-journalist-Verification.dto';

@Controller('journalists')
export class JournalistController {
  constructor(private readonly journalistService: JournalistService) {}

  @Post()
  async create(@Body() createJournalistDto: CreateJournalistDto): Promise<JournalistEntity> {
    return this.journalistService.create(createJournalistDto);
  }


  @Get(':id')
  async findById(@Param('id') id: string): Promise<JournalistEntity> {
    return this.journalistService.findById(id);
  }

  @Get('user/:id')
  async findByUserId(@Param('id') id: string): Promise<JournalistEntity> {
    return this.journalistService.findByUserId(id);
  }


  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateJournalistDto: UpdateJournalistDto,
  ): Promise<JournalistEntity> {
    return this.journalistService.update(id, updateJournalistDto);
  }

    @Patch(':id/verification')
    async updateUserType(
      @Param('id') UserID: string,
      @Body() updateJournalistDto: UpdateJournalistVerificationDto
    ) {
      return await this.journalistService.updateJournalistVerification(UserID, updateJournalistDto);
    }
  
}


