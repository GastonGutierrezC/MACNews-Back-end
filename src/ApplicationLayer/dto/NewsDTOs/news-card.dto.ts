// src/ApplicationLayer/dto/NewsDTOs/news-card.dto.ts
export class NewsCardDto {
    NewsId: string;
    Title: string;
    PublicationDate: string;
    NewsImageURL: string;
    Categories: string;
    Channel: {
      ChannelID: string;
      ChannelName: string;
      ChannelImageURL: string;
    };
    VisitCount: number; 
    CreatorFullName: string;

  }
  