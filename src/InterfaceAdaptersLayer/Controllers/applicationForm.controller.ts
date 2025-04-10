import { Controller, Post, Body, Param, Get, Put,Patch } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateApplicationFormDto } from 'src/ApplicationLayer/dto/ApplicationFormDTOs/create-applicationForm.dto';
import { UpdateApplicationFormVerificationDto } from 'src/ApplicationLayer/dto/ApplicationFormDTOs/update-applicationForm-Verification.dto';
import { UpdateApplicationFormDto } from 'src/ApplicationLayer/dto/ApplicationFormDTOs/update-applicationForm.dto';
import { CreateApplicationFormService } from 'src/ApplicationLayer/UseCases/ApplicationFormUseCases/create.applicationForm';
import { FindApplicationFormService } from 'src/ApplicationLayer/UseCases/ApplicationFormUseCases/find.applicationForm';
import { UpdateApplicationFormService } from 'src/ApplicationLayer/UseCases/ApplicationFormUseCases/update.applicationForm';
import { ApplicationFormEntity } from 'src/DomainLayer/Entities/applicationForm.entity';
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
  @ApiBody({
    type: CreateApplicationFormDto, 
  })  
  async create(@Body() createJournalistDto: CreateApplicationFormDto): Promise<ApplicationFormEntity> {
    return this.createApplicationFormService.create(createJournalistDto);
  }

  @Post('evaluate-with-agent')
  @ApiOperation({ summary: 'Evaluate application form with intelligent agent' })
  @ApiBody({ type: CreateApplicationFormDto })
  async evaluateWithAgent(@Body() dto: CreateApplicationFormDto): Promise<ApplicationAgentResponse> {
    return this.createApplicationFormService.evaluateWithAgent(dto);
  }



  @Get(':id')
  @ApiOperation({ summary: 'Obtain form by ID' })
  async findById(@Param('id') id: string): Promise<ApplicationFormEntity> {
    return this.findApplicationFormService.findById(id);
  }

  @Get('user/:id')
  @ApiOperation({ summary: 'Get form by user ID' })
  async findByUserId(@Param('id') id: string): Promise<ApplicationFormEntity> {
    return this.findApplicationFormService.findByUserId(id);
  }


  @Patch(':id')

  @ApiOperation({ summary: 'update form data' })
  @ApiBody({
    type: UpdateApplicationFormDto, 
  })  
  async update(
    @Param('id') id: string,
    @Body() updateJournalistDto: UpdateApplicationFormDto,
  ): Promise<ApplicationFormEntity> {
    return this.updateApplicationFormService.update(id, updateJournalistDto);
  }


  @ApiOperation({ summary: 'update form status' })
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


