import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { JournalistEntity } from 'src/DomainLayer/Entities/journalist.entity';
import { JournalistRepository } from 'src/InfrastructureLayer/Repositories/journalist.repository';


@Injectable()
export class FindJournalistService {
  constructor(
    private readonly journalistRepository : JournalistRepository,
    
  ) {}

  async findById( JournalistID: string): Promise<JournalistEntity> {
    const journalist = await this.journalistRepository.findById(JournalistID);
    if (!journalist) {
      throw new NotFoundException(`Journalist with ID ${JournalistID} not found.`);
    }
    return journalist;
  }

}
