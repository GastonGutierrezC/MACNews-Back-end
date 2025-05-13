// src/ApplicationLayer/dto/news-document.dto.ts

export class ChannelDto {
    ChannelID: string;
    ChannelName: string;
    ChannelImageURL: string;
  }
  
  export class NewsDocumentDto {
    Title: string;
    ShortDescription: string;
    PublicationDate: string;
    NewsImageURL: string;
    Categories: string;
    Channel: ChannelDto;
  }
  