import { Controller, Post, Body, Param, Get, Put,Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ActiveUser } from 'src/ApplicationLayer/decorators/active-user.decorator';
import { ActiveUserInterface } from 'src/ApplicationLayer/decorators/active-user.interface';
import { Auth } from 'src/ApplicationLayer/decorators/auth.decorators';
import { CreateJournalistDto } from 'src/ApplicationLayer/dto/JournalistDTOs/create-journalist.dto';
import { UpdateJournalistDto } from 'src/ApplicationLayer/dto/JournalistDTOs/update-journalist.dto';
import { AuthService } from 'src/ApplicationLayer/UseCases/AuthUserCases/auth.useCases';
import { CreateJournalistService } from 'src/ApplicationLayer/UseCases/JournalistUseCases/create.journalist';
import { FindJournalistService } from 'src/ApplicationLayer/UseCases/JournalistUseCases/find.journalist';
import { UpdateJournalistService } from 'src/ApplicationLayer/UseCases/JournalistUseCases/update.journalist';
import { JournalistEntity } from 'src/DomainLayer/Entities/journalist.entity';
import { RoleAssigned } from 'src/DomainLayer/Entities/roles.entity';

@ApiTags('Journalist')
@Controller('journalist')
export class JournalistController {
  constructor(
    private readonly createJournalistService:CreateJournalistService,
    private readonly updateJournalistService:UpdateJournalistService,
    private readonly findJournalistService:FindJournalistService,
    private readonly authService: AuthService ,

  ) {}

@Post()
@ApiOperation({ summary: 'Creating the journalist and returning token' })
@Auth([RoleAssigned.Journalist, RoleAssigned.Reader])
@ApiBearerAuth('access-token')
@ApiBody({
  type: CreateJournalistDto,
})  
async create(
  @Body() createJournalistDto: CreateJournalistDto,
  @ActiveUser() user: ActiveUserInterface
): Promise<{ token: string }> {
  return this.authService.promoteToJournalist(createJournalistDto, user.userID);
}


  @Patch(':id')
  @Auth([RoleAssigned.Administrator, RoleAssigned.Journalist])
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'update journalist data' })
  @ApiBody({
    type: UpdateJournalistDto, 
  })  
  async update(
    @Param('id') id: string,
    @Body() updateJournalistDto: UpdateJournalistDto,
    
  ): Promise<JournalistEntity> {
    return this.updateJournalistService.update(id, updateJournalistDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtain journalist by ID' })
  @Auth([RoleAssigned.Administrator, RoleAssigned.Journalist])
  @ApiBearerAuth('access-token')
  async findById(@Param('id') id: string): Promise<JournalistEntity> {
    return this.findJournalistService.findById(id);
  }

  
}


