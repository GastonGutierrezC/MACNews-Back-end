import {
  IsString,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; 

export class CreateFollowChannelDto {


@ApiProperty({
 description: 'ID of the user',
 example: 'ID of the user',
})
        
@IsNotEmpty()
@IsString() 
readonly UserID: string;

@ApiProperty({
description: 'ID of the Channel',
example: 'ID of the Channel',
   })
           
@IsNotEmpty()
@IsString() 
readonly ChannelID: string;
   


}
