import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsEntity } from '../../DomainLayer/Entities/news.entity';

@Injectable()
export class NewsRepository {
  constructor(
    @InjectRepository(NewsEntity)
    private readonly newsRepo: Repository<NewsEntity>,
  ) {}

  // Crear una noticia
  async create(newsData: Partial<NewsEntity>): Promise<NewsEntity> {
    const newNews = this.newsRepo.create(newsData);
    return await this.newsRepo.save(newNews);
  }

  // Actualizar una noticia
  async update(NewsId: string, updateData: Partial<NewsEntity>): Promise<NewsEntity> {
    const news = await this.newsRepo.findOneBy({ NewsId });
    if (!news) {
      throw new Error('News not found');
    }
    await this.newsRepo.update(NewsId, updateData);
    return { ...news, ...updateData };
  }

  // Eliminar una noticia
  async delete(NewsId: string): Promise<void> {
    const result = await this.newsRepo.delete(NewsId);
    if (result.affected === 0) {
      throw new Error('News not found');
    }
  }

  // Buscar una noticia por ID, incluyendo la relación con Channel
  async findById(NewsId: string): Promise<NewsEntity | null> {
    return await this.newsRepo.findOne({
      where: { NewsId },
      relations: ['Channel'],  // Asegúrate de que se trae la relación con el canal
    });
  }

  // Buscar noticias por título, incluyendo la relación con Channel
  async findByTitle(Title: string): Promise<NewsEntity[]> {
    return await this.newsRepo.find({
      where: { Title },
      relations: ['Channel'],  // Asegúrate de que se trae la relación con el canal
    });
  }

  // Buscar noticias por ChannelID (esto es útil para la validación)
  async findByChannelId(ChannelID: string): Promise<NewsEntity[]> {
    return await this.newsRepo.find({
      where: { Channel: { ChannelID } },
      relations: ['Channel'],
    });
  }
}
