// src/ApplicationLayer/dto/NewsDTOs/news-detail.dto.ts
export interface ChannelDto {
    ChannelID: string;
    ChannelName: string;
    DescriptionChannel: string;
    Specialties: string[];
    ChannelImageURL: string;
  }
  
  export interface NewsDetailDto {
    NewsId: string;
    Title: string;
    ShortDescription: string;
    Content: string;
    PublicationDate: string;
    NewsStatus: string;
    NewsImageURL: string;
    Categories: string;
    Channel: ChannelDto;
    CreatorFullName: string;
  }
  