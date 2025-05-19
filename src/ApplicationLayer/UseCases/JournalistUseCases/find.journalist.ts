import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { JournalistEntity } from 'src/DomainLayer/Entities/journalist.entity';
import { IJournalistRepository } from 'src/InfrastructureLayer/Repositories/Interface/journalist.repository.interface';

@Injectable()
export class FindJournalistService {
  constructor(
    @Inject('IJournalistRepository')
    private readonly journalistRepository: IJournalistRepository,  
  ) {}

  async findById( JournalistID: string): Promise<JournalistEntity> {
    const journalist = await this.journalistRepository.findById(JournalistID);
    if (!journalist) {
      throw new NotFoundException(`Journalist with ID ${JournalistID} not found.`);
    }
    return journalist;
  }

}
