import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { NewsCardDto } from 'src/ApplicationLayer/dto/NewsDTOs/news-card.dto';
import { NewsCategory, NewsEntity } from 'src/DomainLayer/Entities/news.entity';
import { FindVisitsService } from '../VisitsUseCases/find.visits';
import { NewsTopDto } from 'src/ApplicationLayer/dto/NewsDTOs/findTopNews.dto';
import { NewsDocumentDto } from 'src/ApplicationLayer/dto/NewsDTOs/news-document.dto';
import { ChannelSpecialties } from 'src/DomainLayer/Entities/channel.entity';
import { INewsRepository } from 'src/InfrastructureLayer/Repositories/Interface/news.repository.interface';
import { IElasticsearchService } from 'src/InfrastructureLayer/ElasticsearchConnection/Interfaces/elasticsearchService.elasticsearch.interface';
import { shuffle } from './shuffleArray';
import { NewsDetailDto } from 'src/ApplicationLayer/dto/NewsDTOs/news-detail.dto';

@Injectable()
export class FindNewsService {
  constructor(

    @Inject('INewsRepository')
    private readonly newsRepository: INewsRepository,
    private readonly findVisitsService: FindVisitsService,
    @Inject('IElasticsearchService')
    private readonly elasticsearchService: IElasticsearchService, // ← Agregado

  ) {}


  
  async getById(NewsId: string): Promise<NewsEntity> {
    const news = await this.newsRepository.findById(NewsId);
    if (!news) {
      throw new NotFoundException(`News with ID ${NewsId} not found`);
    }

    return news;
  }

  async getByTitleAndDate(title: string, publicationDate: string): Promise<NewsDetailDto> {
    const allNews = await this.newsRepository.findAll();

    const news = allNews.find(n =>
      n.Title === title &&
      new Date(n.PublicationDate).toISOString().split('T')[0] === new Date(publicationDate).toISOString().split('T')[0]
    );

    if (!news) {
      throw new NotFoundException(`No news found with title "${title}" and date "${publicationDate}"`);
    }

    return this.mapToNewsDetailDto(news);
  }

  private mapToNewsDetailDto(news: NewsEntity): NewsDetailDto {
    const user = news.Channel.Journalist?.User;
    const creatorFullName = user
      ? `${user.UserFirstName} ${user.UserLastName}`
      : 'Nombre no disponible';

    return {
      NewsId: news.NewsId,
      Title: news.Title,
      ShortDescription: news.ShortDescription,
      Content: news.Content,
      PublicationDate: news.PublicationDate,
      NewsStatus: news.NewsStatus,
      NewsImageURL: news.NewsImageURL,
      Categories: news.Categories,
      Channel: {
        ChannelID: news.Channel.ChannelID,
        ChannelName: news.Channel.ChannelName,
        DescriptionChannel: news.Channel.DescriptionChannel,
        Specialties: news.Channel.Specialties,
        ChannelImageURL: news.Channel.ChannelImageURL,
      },
      CreatorFullName: creatorFullName,
    };
  }
  
  

  async getAllAsCards(page: number, limit: number): Promise<NewsCardDto[]> {
    const allNews = await this.newsRepository.findAll();
  
    const newsWithVisits: NewsCardDto[] = await Promise.all(
      allNews.map(async (n) => {

        const user = n.Channel.Journalist?.User;
        const creatorFullName = user
          ? `${user.UserFirstName} ${user.UserLastName}`
          : 'Nombre no disponible';

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
          CreatorFullName:creatorFullName
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



  async getTop5ByChannelAndCategory(channelId: string, category: NewsCategory): Promise<NewsCardDto[]> {
    const allNews = await this.newsRepository.findAll();
  
    // Noticias que son del canal y de la categoría deseada
    const matchingNews = allNews.filter(
      n =>
        n.Channel.ChannelID === channelId &&
        n.Categories.includes(category)
    );
  
    const matchingNewsWithVisits = await Promise.all(
      matchingNews.map(async (n) => {
        const visitData = await this.findVisitsService.getVisitCountByNews(n.NewsId);
        const user = n.Channel.Journalist?.User;
        const creatorFullName = user
          ? `${user.UserFirstName} ${user.UserLastName}`
          : 'Nombre no disponible';
        
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
          CreatorFullName: creatorFullName
        };
      }),
    );
  
    // Ordenar por visitas
    const sortedMatchingNews = matchingNewsWithVisits.sort((a, b) => b.VisitCount - a.VisitCount);
  
    // Si ya hay 5 o más, devolver los primeros 5
    if (sortedMatchingNews.length >= 5) {
      return sortedMatchingNews.slice(0, 5);
    }
  
    // Si no hay suficientes, buscar noticias aleatorias de la misma categoría, de otros canales
    const additionalNeeded = 5 - sortedMatchingNews.length;
    const otherNewsCandidates = allNews.filter(
      n =>
        n.Channel.ChannelID !== channelId &&
        n.Categories.includes(category)
    );
  
    const shuffled = shuffle(otherNewsCandidates);
  
    const additionalNewsWithVisits = await Promise.all(
      shuffled.slice(0, additionalNeeded).map(async (n) => {
        const visitData = await this.findVisitsService.getVisitCountByNews(n.NewsId);
        const user = n.Channel.Journalist?.User;
        const creatorFullName = user
          ? `${user.UserFirstName} ${user.UserLastName}`
          : 'Nombre no disponible';
        
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
          CreatorFullName: creatorFullName
        };
      }),
    );
  
    return [...sortedMatchingNews, ...additionalNewsWithVisits];
  }

  async getByChannelId(ChannelID: string): Promise<NewsCardDto[]> {
    const allNews = await this.newsRepository.findAll();
  
    const filteredNews = allNews.filter(n => n.Channel.ChannelID === ChannelID);
  
    const newsWithVisits: NewsCardDto[] = await Promise.all(
      filteredNews.map(async (n) => {
        const visitData = await this.findVisitsService.getVisitCountByNews(n.NewsId);
        
        const user = n.Channel.Journalist?.User;
        const creatorFullName = user
          ? `${user.UserFirstName} ${user.UserLastName}`
          : 'Nombre no disponible';

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
          CreatorFullName: creatorFullName
        };
      }),
    );
  
    return newsWithVisits;
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
      NewsImageURL: item.news.NewsImageURL,
      PublicationDate: item.news.PublicationDate
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
  
      const results: NewsCardDto[] = [];
  
      for (const [id, source] of uniqueResultsMap.entries()) {
        // 🔍 Validar si existe realmente en la base de datos
        const existingNews = await this.newsRepository.findById(id);
        if (!existingNews) continue; // ❌ Ignorar si no existe
  
        const visitData = await this.findVisitsService.getVisitCountByNews(id);
  
        const user = existingNews.Channel?.Journalist?.User;
        const creatorFullName = user
          ? `${user.UserFirstName} ${user.UserLastName}`
          : 'Nombre no disponible';

        results.push({
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
          CreatorFullName: creatorFullName,
        });
      }
  
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
        
        const user = n.Channel.Journalist?.User;
        const creatorFullName = user
          ? `${user.UserFirstName} ${user.UserLastName}`
          : 'Nombre no disponible';
        
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
          CreatorFullName : creatorFullName
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
    const filteredNews = allNews.filter(n => n.Channel.Specialties.includes(specialty));
  
    if (filteredNews.length === 0) {
      throw new NotFoundException(`No news found for specialty "${specialty}"`);
    }
  
    // Mapea las noticias filtradas a NewsCardDto y agrega la información de visitas
    const newsWithVisits: NewsCardDto[] = await Promise.all(
      filteredNews.map(async (n) => {
        const visitData = await this.findVisitsService.getVisitCountByNews(n.NewsId);
        
        const user =  n.Channel.Journalist?.User;
        const creatorFullName = user
          ? `${user.UserFirstName} ${user.UserLastName}`
          : 'Nombre no disponible';

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
          CreatorFullName : creatorFullName
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
