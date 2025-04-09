export interface NewsSuggestion {
    NewsId: string;
    Title: string;
    Categories: string;
  }
  
  export interface PersonalizedRecommendations {
    sugerencias: NewsSuggestion[];
  }
  
  export type RecommendationAgentResponse = PersonalizedRecommendations;
  