import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ExternalSuggestion {
  @IsString()
  suggestion: string;
}

export class UpdateNewsWithSuggestionsDto {
  @IsString()
  newsContent: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExternalSuggestion)
  externalSuggestions: ExternalSuggestion[];
}

export class UpdatedNewsResponseDto {
  @IsString()
  newNews: string;
}
