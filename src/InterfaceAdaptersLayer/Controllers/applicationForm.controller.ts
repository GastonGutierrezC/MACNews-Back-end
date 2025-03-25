import { Controller, Post, Body, Param, Get, Put,Patch } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateApplicationFormDto } from 'src/ApplicationLayer/dto/ApplicationFormDTOs/create-applicationForm.dto';
import { UpdateApplicationFormVerificationDto } from 'src/ApplicationLayer/dto/ApplicationFormDTOs/update-applicationForm-Verification.dto';
import { UpdateApplicationFormDto } from 'src/ApplicationLayer/dto/ApplicationFormDTOs/update-applicationForm.dto';
import { CreateUserWithPasswordDto } from 'src/ApplicationLayer/dto/UserDTOs/create-all-data-user.dto';
import { CreateApplicationFormService } from 'src/ApplicationLayer/UseCases/ApplicationFormUseCases/create.applicationForm';
import { FindApplicationFormService } from 'src/ApplicationLayer/UseCases/ApplicationFormUseCases/find.applicationForm';
import { UpdateApplicationFormService } from 'src/ApplicationLayer/UseCases/ApplicationFormUseCases/update.applicationForm';
import { ApplicationFormEntity } from 'src/DomainLayer/Entities/applicationForm.entity';

@ApiTags('ApplicationForm')
@Controller('ApplicationForm')
export class ApplicationFormController {
  constructor(
    private readonly createApplicationFormService: CreateApplicationFormService,
    private readonly findApplicationFormService: FindApplicationFormService,
    private readonly updateApplicationFormService: UpdateApplicationFormService,

  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un formulario de postulacion' })
  @ApiBody({
    type: CreateApplicationFormDto, // Usar el DTO combinado aquí
  })  
  async create(@Body() createJournalistDto: CreateApplicationFormDto): Promise<ApplicationFormEntity> {
    return this.createApplicationFormService.create(createJournalistDto);
  }


  @Get(':id')
  @ApiOperation({ summary: 'Obtener el formulario por ID' })
  async findById(@Param('id') id: string): Promise<ApplicationFormEntity> {
    return this.findApplicationFormService.findById(id);
  }

  @Get('user/:id')
  @ApiOperation({ summary: 'Obtener el formulario por ID del usuario' })
  async findByUserId(@Param('id') id: string): Promise<ApplicationFormEntity> {
    return this.findApplicationFormService.findByUserId(id);
  }


  @Patch(':id')

  @ApiOperation({ summary: 'actualizar datos del formulario' })
  @ApiBody({
    type: UpdateApplicationFormDto, // Usar el DTO combinado aquí
  })  
  async update(
    @Param('id') id: string,
    @Body() updateJournalistDto: UpdateApplicationFormDto,
  ): Promise<ApplicationFormEntity> {
    return this.updateApplicationFormService.update(id, updateJournalistDto);
  }


  @ApiOperation({ summary: 'actualizar el estado  del formulario' })
  @ApiBody({
    type: UpdateApplicationFormVerificationDto, // Usar el DTO combinado aquí
  })  
    @Patch('verification/:id')
    async updateUserType(
      @Param('id') UserID: string,
      @Body() updateJournalistDto: UpdateApplicationFormVerificationDto
    ) {
      return await this.updateApplicationFormService.updateJournalistVerification(UserID, updateJournalistDto);
    }
  
}


