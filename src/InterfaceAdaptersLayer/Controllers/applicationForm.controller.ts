import { Controller, Post, Body, Param, Get, Put,Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ActiveUser } from 'src/ApplicationLayer/decorators/active-user.decorator';
import { ActiveUserInterface } from 'src/ApplicationLayer/decorators/active-user.interface';
import { Auth } from 'src/ApplicationLayer/decorators/auth.decorators';
import { CreateApplicationFormIADto } from 'src/ApplicationLayer/dto/ApplicationFormDTOs/create-applicationForm-IA.dto';
import { CreateApplicationFormDto } from 'src/ApplicationLayer/dto/ApplicationFormDTOs/create-applicationForm.dto';
import { UpdateApplicationFormVerificationDto } from 'src/ApplicationLayer/dto/ApplicationFormDTOs/update-applicationForm-Verification.dto';
import { UpdateApplicationFormDto } from 'src/ApplicationLayer/dto/ApplicationFormDTOs/update-applicationForm.dto';
import { CreateApplicationFormService } from 'src/ApplicationLayer/UseCases/ApplicationFormUseCases/create.applicationForm';
import { FindApplicationFormService } from 'src/ApplicationLayer/UseCases/ApplicationFormUseCases/find.applicationForm';
import { UpdateApplicationFormService } from 'src/ApplicationLayer/UseCases/ApplicationFormUseCases/update.applicationForm';
import { ApplicationFormEntity } from 'src/DomainLayer/Entities/applicationForm.entity';
import { RoleAssigned } from 'src/DomainLayer/Entities/roles.entity';
import { ApplicationAgentResponse } from 'src/InfrastructureLayer/IntelligentAgentManagement/DTO.IntelligentAgent/JurnalistApplications/agent-response.dto';

@ApiTags('ApplicationForm')
@Controller('applicationForm')
export class ApplicationFormController {
  constructor(
    private readonly createApplicationFormService: CreateApplicationFormService,
    private readonly findApplicationFormService: FindApplicationFormService,
    private readonly updateApplicationFormService: UpdateApplicationFormService,

  ) {}

  @Post()
  @ApiOperation({ summary: 'Create an application form' })
  @Auth(RoleAssigned.Administrator)
  @ApiBearerAuth('access-token')
  @ApiBody({
    type: CreateApplicationFormDto, 
  })  
  async create(@Body() createJournalistDto: CreateApplicationFormDto): Promise<ApplicationFormEntity> {
    return this.createApplicationFormService.create(createJournalistDto);
  }

  @Post('evaluate-with-agent')
  @ApiOperation({ summary: 'Evaluate application form with intelligent agent' })
  @Auth(RoleAssigned.Reader)
  @ApiBearerAuth('access-token')
  @ApiBody({ type: CreateApplicationFormIADto })
  async evaluateWithAgent(@ActiveUser() user: ActiveUserInterface, @Body() dto: CreateApplicationFormIADto): Promise<ApplicationAgentResponse> {
    return this.createApplicationFormService.evaluateWithAgent(dto,user.userID);
  }


  @ApiOperation({ summary: 'update form status' })
  @Auth(RoleAssigned.Administrator)
  @ApiBearerAuth('access-token')
  @ApiBody({
    type: UpdateApplicationFormVerificationDto, 
  })  
    @Patch('verification/:id')
    async updateUserType(
      @Param('id') UserID: string,
      @Body() updateJournalistDto: UpdateApplicationFormVerificationDto
    ) {
      return await this.updateApplicationFormService.updateJournalistVerification(UserID, updateJournalistDto);
    }
  
}


