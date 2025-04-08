import { Injectable, NotFoundException } from '@nestjs/common';
import { VisitsEntity } from 'src/DomainLayer/Entities/visits.entity';
import { VisitsRepository } from 'src/InfrastructureLayer/Repositories/visits.repository';
import { UserRepository } from 'src/InfrastructureLayer/Repositories/user.repository';
import { NewsRepository } from 'src/InfrastructureLayer/Repositories/news.repository';
import { CreateVisitsDto } from 'src/ApplicationLayer/dto/ VisitsDTOs/create-visits.dto';

@Injectable()
export class CreateVisitsService {
  constructor(
    private readonly visitsRepository: VisitsRepository,
    private readonly userRepository: UserRepository,
    private readonly newsRepository: NewsRepository,
  ) {}

  async create(createVisitsDto: CreateVisitsDto): Promise<VisitsEntity> {
    const user = await this.userRepository.findById(createVisitsDto.UserID);
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const news = await this.newsRepository.findById(createVisitsDto.NewsID);
    if (!news) {
      throw new NotFoundException('News not found.');
    }

    const newVisit = await this.visitsRepository.create({
      User: user,
      News: news,
    });

    return newVisit;
  }
}
