import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { VisitsEntity } from 'src/DomainLayer/Entities/visits.entity';
import { CreateVisitsDto } from 'src/ApplicationLayer/dto/ VisitsDTOs/create-visits.dto';
import { IVisitRepository } from 'src/InfrastructureLayer/Repositories/Interface/visits.repository.interface';
import { IUserRepository } from 'src/InfrastructureLayer/Repositories/Interface/user.repository.interface';
import { INewsRepository } from 'src/InfrastructureLayer/Repositories/Interface/news.repository.interface';

@Injectable()
export class CreateVisitsService {
  constructor(
    @Inject('IVisitRepository')
    private readonly visitsRepository: IVisitRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('INewsRepository')
    private readonly newsRepository: INewsRepository,
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
