import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { NewsEntity } from 'src/DomainLayer/Entities/news.entity';
import { NewsRepository } from 'src/InfrastructureLayer/Repositories/news.repository';
import { CreateNewsDto } from '../dto/NewsDTOs/create-news.dto';
import { UpdateNewsDto } from '../dto/NewsDTOs/update-news.dto';
import { ChannelRepository } from 'src/InfrastructureLayer/Repositories/channel.repository';  // Importamos ChannelRepository

@Injectable()
export class NewsService {
  constructor(
    private readonly newsRepository: NewsRepository,
    private readonly channelRepository: ChannelRepository,  // Inyectamos el repositorio de canales
  ) {}

  // Crear una nueva noticia
  async create(createNewsDto: CreateNewsDto): Promise<NewsEntity> {
    // Verificar que el canal existe
    const channel = await this.channelRepository.findById(createNewsDto.ChannelID);
    if (!channel) {
      throw new NotFoundException(`Channel with ID ${createNewsDto.ChannelID} not found`);
    }

    // Crear la noticia y asociarla al canal
    const news = await this.newsRepository.create({
      ...createNewsDto,
      Channel: channel,  // Asociamos la noticia con el canal
    });

    return news;
  }

  // Actualizar una noticia existente
  async update(NewsId: string, updateNewsDto: UpdateNewsDto): Promise<NewsEntity> {
    // Buscar la noticia por ID
    const news = await this.newsRepository.findById(NewsId);
    if (!news) {
      throw new NotFoundException(`News with ID ${NewsId} not found`);
    }


    // Actualizar la noticia
    const updatedNews = await this.newsRepository.update(NewsId, updateNewsDto);
    return updatedNews;
  }

  // Eliminar una noticia
  async delete(NewsId: string): Promise<void> {
    const news = await this.newsRepository.findById(NewsId);
    if (!news) {
      throw new NotFoundException(`News with ID ${NewsId} not found`);
    }

    await this.newsRepository.delete(NewsId);
  }

  // Obtener una noticia por su ID
  async getById(NewsId: string): Promise<NewsEntity> {
    const news = await this.newsRepository.findById(NewsId);
    if (!news) {
      throw new NotFoundException(`News with ID ${NewsId} not found`);
    }

    return news;
  }

  // Obtener noticias por título
  async getByTitle(Title: string): Promise<NewsEntity[]> {
    const newsList = await this.newsRepository.findByTitle(Title);
    if (newsList.length === 0) {
      throw new NotFoundException(`No news found with title ${Title}`);
    }

    return newsList;
  }

  // Obtener noticias por ChannelID (si necesitas mostrar todas las noticias de un canal específico)
  async getByChannelId(ChannelID: string): Promise<NewsEntity[]> {
    const newsList = await this.newsRepository.findByChannelId(ChannelID);
    if (newsList.length === 0) {
      throw new NotFoundException(`No news found for Channel with ID ${ChannelID}`);
    }

    return newsList;
  }
}
