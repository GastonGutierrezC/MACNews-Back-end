import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateJournalistDto } from 'src/ApplicationLayer/dto/JournalistDTOs/update-journalist.dto';
import { JournalistEntity } from 'src/DomainLayer/Entities/journalist.entity';
import { JournalistRepository } from 'src/InfrastructureLayer/Repositories/journalist.repository';


@Injectable()
export class UpdateJournalistService {
  constructor(
    private readonly journalistRepository : JournalistRepository,
  ) {}



  async update(journalistID: string, updateJournalistDto: UpdateJournalistDto): Promise<JournalistEntity> {
    const journalist = await this.journalistRepository.findById(journalistID);
    if (!journalist) {
      throw new NotFoundException(`applicationForm with ID ${journalistID} not found.`);
    }

    await this.journalistRepository.update(journalistID, updateJournalistDto);
    return { ...journalist, ...updateJournalistDto };
  }



}