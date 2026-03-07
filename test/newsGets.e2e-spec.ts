import { Test, TestingModule } from '@nestjs/testing';
import { FindNewsService } from 'src/ApplicationLayer/UseCases/NewsUseCases/find.news';
import { INewsRepository } from 'src/InfrastructureLayer/Repositories/Interface/news.repository.interface';
import { FindVisitsService } from 'src/ApplicationLayer/UseCases/VisitsUseCases/find.visits';
import { NewsEntity } from 'src/DomainLayer/Entities/news.entity';
import { NewsCardDto } from 'src/ApplicationLayer/dto/NewsDTOs/news-card.dto';
import { NewsTopDto } from 'src/ApplicationLayer/dto/NewsDTOs/findTopNews.dto';
import { ChannelSpecialties } from 'src/DomainLayer/Entities/channel.entity';
import { NewsCategory } from 'src/DomainLayer/Entities/news.entity';
import { NotFoundException } from '@nestjs/common';

describe('FindNewsService GET methods', () => {
  let service: FindNewsService;
  let newsRepo: INewsRepository;
  let visitsService: FindVisitsService;

  const mockNews: NewsEntity[] = [
    {
      NewsId: '1',
      Title: 'Noticia 1',
      ShortDescription: 'Descripción corta',
      Content: 'Contenido completo',
      PublicationDate: '2025-07-15T04:00:00.000Z',
      NewsStatus: 'Published',
      NewsImageURL: 'https://example.com/news1.png',
      Categories: 'Politics',
      Channel: {
        ChannelID: 'channel1',
        ChannelName: 'Noticias Bolivianas',
        DescriptionChannel: 'Descripción canal',
        Specialties: [ChannelSpecialties.Scientific],
        ChannelImageURL: 'https://example.com/channel.png',
        Journalist: { User: { UserFirstName: 'Juan', UserLastName: 'Pérez', UserID: 'user1' } },
      },
    } as any,
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindNewsService,
        {
          provide: 'INewsRepository',
          useValue: {
            findAll: jest.fn().mockResolvedValue(mockNews),
            findById: jest.fn((id: string) => {
              const news = mockNews.find(n => n.NewsId === id);
              return Promise.resolve(news);
            }),
          },
        },
        {
          provide: FindVisitsService,
          useValue: {
            getVisitCountByNews: jest.fn().mockResolvedValue({ visitCount: 10 }),
          },
        },
        {
          provide: 'IElasticsearchService',
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<FindNewsService>(FindNewsService);
    newsRepo = module.get<INewsRepository>('INewsRepository');
    visitsService = module.get<FindVisitsService>(FindVisitsService);
  });

  it('getById should return a news entity', async () => {
    const result = await service.getById('1');
    expect(result).toEqual(mockNews[0]);
  });

  it('getById should throw NotFoundException if id does not exist', async () => {
    await expect(service.getById('999')).rejects.toThrow(NotFoundException);
  });

  it('getByTitleAndDate should return news detail', async () => {
    const result = await service.getByTitleAndDate('Noticia 1', '2025-07-15');
    expect(result.Title).toEqual('Noticia 1');
  });

  it('getAllAsCards should return NewsCardDto array', async () => {
    const result: NewsCardDto[] = await service.getAllAsCards(1, 10);
    expect(result[0].NewsId).toEqual('1');
    expect(result[0].VisitCount).toEqual(10);
  });

  it('getByCategory should return NewsCardDto array', async () => {
    const result = await service.getByCategory(NewsCategory.Politics, 1, 10);
    expect(result[0].Categories).toEqual('Politics');
  });

  it('getByTitle should return array of NewsEntity', async () => {
    const result = await service.getByTitle('Noticia 1');
    expect(result[0].Title).toEqual('Noticia 1');
  });

  it('getByChannelId should return NewsCardDto array', async () => {
    const result = await service.getByChannelId('channel1');
    expect(result[0].Channel.ChannelID).toEqual('channel1');
  });

  it('getAllSummarized should return NewsTopDto array', async () => {
    const result: NewsTopDto[] = await service.getAllSummarized();
    expect(result[0].NewsID).toEqual('1');
  });

  it('getCategoryVisitMetricsByUser should return category metrics', async () => {
    const result = await service.getCategoryVisitMetricsByUser('user1');
    expect(result[0].category).toEqual('Politics');
    expect(result[0].visitCount).toEqual(10);
  });
});
