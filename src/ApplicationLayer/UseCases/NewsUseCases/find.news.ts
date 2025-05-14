import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { NewsSummaryDto } from 'src/ApplicationLayer/dto/NewsDTOs/find-news.dto';
import { NewsCardDto } from 'src/ApplicationLayer/dto/NewsDTOs/news-card.dto';
import { NewsCategory, NewsEntity } from 'src/DomainLayer/Entities/news.entity';
import { NewsRepository } from 'src/InfrastructureLayer/Repositories/news.repository';
import { FindVisitsService } from '../VisitsUseCases/find.visits';
import { NewsTopDto } from 'src/ApplicationLayer/dto/NewsDTOs/findTopNews.dto';
import { ElasticsearchService } from 'src/InfrastructureLayer/ElasticsearchConnection/ElasticsearchService';
import { NewsDocumentDto } from 'src/ApplicationLayer/dto/NewsDTOs/news-document.dto';
import { ChannelSpecialties } from 'src/DomainLayer/Entities/channel.entity';

@Injectable()
export class FindNewsService {
  constructor(
    private readonly newsRepository: NewsRepository,
    private readonly findVisitsService: FindVisitsService,
    private readonly elasticsearchService: ElasticsearchService, // ← Agregado

  ) {}


  
  async getById(NewsId: string): Promise<NewsEntity> {
    const news = await this.newsRepository.findById(NewsId);
    if (!news) {
      throw new NotFoundException(`News with ID ${NewsId} not found`);
    }

    return news;
  }

  async getAllAsCards(page: number, limit: number): Promise<NewsCardDto[]> {
    const allNews = await this.newsRepository.findAll();
  
    const newsWithVisits: NewsCardDto[] = await Promise.all(
      allNews.map(async (n) => {
        const visitData = await this.findVisitsService.getVisitCountByNews(n.NewsId);
        return {
          NewsId: n.NewsId,
          Title: n.Title,
          PublicationDate: n.PublicationDate,
          NewsImageURL: n.NewsImageURL,
          Categories: n.Categories,
          Channel: {
            ChannelID: n.Channel.ChannelID,
            ChannelName: n.Channel.ChannelName,
            ChannelImageURL: n.Channel.ChannelImageURL,
          },
          VisitCount: visitData.visitCount,
        };
      }),
    );
  
  
    const sortedNews = newsWithVisits.sort((a, b) => b.VisitCount - a.VisitCount);
  
    const startIndex = (page - 1) * limit;
    const paginatedNews = sortedNews.slice(startIndex, startIndex + limit);
  
    return paginatedNews;
  }
  

  


  async getByTitle(Title: string): Promise<NewsEntity[]> {
    const news = await this.newsRepository.findAll();
    const filteredNews = news.filter(n => n.Title === Title);
    if (filteredNews.length === 0) {
      throw new NotFoundException(`No news found with title "${Title}"`);
    }
    return filteredNews;
  }

  async getByChannelId(ChannelID: string): Promise<NewsEntity[]> {
    const news = await this.newsRepository.findAll();
    const filteredNews = news.filter(n => n.Channel.ChannelID === ChannelID);
    if (filteredNews.length === 0) {
      throw new NotFoundException(`No news found for channel ID "${ChannelID}"`);
    }
    return filteredNews;
  }

  async getAllSummarized(): Promise<NewsTopDto[]> {
    const news = await this.newsRepository.findAll();
  
  
    const newsWithVisits = await Promise.all(
      news.map(async (n) => {
        const visitData = await this.findVisitsService.getVisitCountByNews(n.NewsId);
        return {
          news: n,
          visitCount: visitData.visitCount
        };
      })
    );
  
  
    const sorted = newsWithVisits.sort((a, b) => b.visitCount - a.visitCount);
  
   
    return sorted.map(item => ({
      NewsID: item.news.NewsId,
      Title: item.news.Title,
      NewsImageURL: item.news.NewsImageURL
    }));
  }

  async searchIntelligent(texto: string): Promise<NewsCardDto[]> {
    try {
      const [phraseResults, mostFieldsResults] = await Promise.all([
        this.elasticsearchService.phrasePrefixSearch('news', texto),
        this.elasticsearchService.mostFieldsSearch('news', texto),
      ]);
  
      const allHits = [
        ...phraseResults.hits.hits,
        ...mostFieldsResults.hits.hits,
      ];
  

      const uniqueResultsMap = new Map<string, NewsDocumentDto>();
  
      for (const hit of allHits) {
        if (!uniqueResultsMap.has(hit._id)) {
          uniqueResultsMap.set(hit._id, hit._source);
        }
      }

      const results: NewsCardDto[] = await Promise.all(
        Array.from(uniqueResultsMap.entries()).map(async ([id, source]) => {
          const visitData = await this.findVisitsService.getVisitCountByNews(id);
          return {
            NewsId: id,
            Title: source.Title,
            PublicationDate: source.PublicationDate,
            NewsImageURL: source.NewsImageURL,
            Categories: source.Categories,
            Channel: {
              ChannelID: source.Channel.ChannelID,
              ChannelName: source.Channel.ChannelName,
              ChannelImageURL: source.Channel.ChannelImageURL,
            },
            VisitCount: visitData.visitCount,
          };
        })
      );
  
      return results;
    } catch (error) {
      throw new BadRequestException('Error en buscador inteligente');
    }
  }

  async getByCategory(category: NewsCategory, page: number, limit: number): Promise<NewsCardDto[]> {
    // Obtiene todas las noticias
    const allNews = await this.newsRepository.findAll();
  
    // Filtra las noticias por la categoría proporcionada
    const filteredNews = allNews.filter(n => n.Categories === category);
  
    if (filteredNews.length === 0) {
      throw new NotFoundException(`No news found for category "${category}"`);
    }
  
    // Mapea las noticias filtradas a NewsCardDto y agrega la información de visitas
    const newsWithVisits: NewsCardDto[] = await Promise.all(
      filteredNews.map(async (n) => {
        const visitData = await this.findVisitsService.getVisitCountByNews(n.NewsId);
        return {
          NewsId: n.NewsId,
          Title: n.Title,
          PublicationDate: n.PublicationDate,
          NewsImageURL: n.NewsImageURL,
          Categories: n.Categories,
          Channel: {
            ChannelID: n.Channel.ChannelID,
            ChannelName: n.Channel.Specialties,
            ChannelImageURL: n.Channel.ChannelImageURL,
          },
          VisitCount: visitData.visitCount,
        };
      }),
    );
  
    // Ordena las noticias por el número de visitas (de mayor a menor)
    const sortedNews = newsWithVisits.sort((a, b) => b.VisitCount - a.VisitCount);
  
    // Paginación
    const startIndex = (page - 1) * limit;
    const paginatedNews = sortedNews.slice(startIndex, startIndex + limit);
  
    return paginatedNews;
  }
  
  async getBySpecialty(specialty: ChannelSpecialties, page: number, limit: number): Promise<NewsCardDto[]> {
    // Obtiene todas las noticias
    const allNews = await this.newsRepository.findAll();
  
    // Filtra las noticias por la especialidad del canal
    const filteredNews = allNews.filter(n => n.Channel.Specialties === specialty);
  
    if (filteredNews.length === 0) {
      throw new NotFoundException(`No news found for specialty "${specialty}"`);
    }
  
    // Mapea las noticias filtradas a NewsCardDto y agrega la información de visitas
    const newsWithVisits: NewsCardDto[] = await Promise.all(
      filteredNews.map(async (n) => {
        const visitData = await this.findVisitsService.getVisitCountByNews(n.NewsId);
        return {
          NewsId: n.NewsId,
          Title: n.Title,
          PublicationDate: n.PublicationDate,
          NewsImageURL: n.NewsImageURL,
          Categories: n.Categories,
          Channel: {
            ChannelID: n.Channel.ChannelID,
            ChannelName: n.Channel.ChannelName,
            ChannelImageURL: n.Channel.ChannelImageURL,
          },
          VisitCount: visitData.visitCount,
        };
      }),
    );
  
    // Ordena las noticias por el número de visitas (de mayor a menor)
    const sortedNews = newsWithVisits.sort((a, b) => b.VisitCount - a.VisitCount);
  
    // Paginación
    const startIndex = (page - 1) * limit;
    const paginatedNews = sortedNews.slice(startIndex, startIndex + limit);
  
    return paginatedNews;
  }
  
  
}
