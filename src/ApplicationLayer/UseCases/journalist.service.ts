import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { JournalistEntity } from 'src/DomainLayer/Entities/journalist.entity';
import { JournalistRepository } from 'src/InfrastructureLayer/Repositories/journalist.repository';
import { CreateJournalistDto } from '../dto/JournalistDTOs/create-journalist.dto';
import { UpdateJournalistDto } from '../dto/JournalistDTOs/update-journalist.dto';
import { UserRepository } from 'src/InfrastructureLayer/Repositories/user.repository';
import { UpdateJournalistVerificationDto } from '../dto/JournalistDTOs/update-journalist-Verification.dto';


@Injectable()
export class JournalistService {
  constructor(
    private readonly journalistRepository: JournalistRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async create(createJournalistDto: CreateJournalistDto): Promise<JournalistEntity> {
    const existingJournalist = await this.journalistRepository.findByUserId(createJournalistDto.UserID);
    if (existingJournalist) {
      throw new BadRequestException('This user is already a journalist.');
    }

    const user = await this.userRepository.findById(createJournalistDto.UserID);
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const journalist = this.journalistRepository.create({
      ...createJournalistDto,
      User: user,
    });

    return journalist;  
  }
  
  async findById(JournalistID: string): Promise<JournalistEntity> {
    const journalist = await this.journalistRepository.findById(JournalistID);
    if (!journalist) {
      throw new NotFoundException(`Journalist with ID ${JournalistID} not found.`);
    }
    return journalist;
  }

  async findByUserId(UserID: string): Promise<JournalistEntity> {
    const journalist = await this.journalistRepository.findByUserId(UserID);
    if (!journalist) {
      throw new NotFoundException(`Journalist with UserID ${UserID} not found.`);
    }
    return journalist;
  }

  async update(JournalistID: string, updateJournalistDto: UpdateJournalistDto): Promise<JournalistEntity> {
    const journalist = await this.findById(JournalistID); 

    await this.journalistRepository.update(JournalistID, updateJournalistDto);
    return { ...journalist, ...updateJournalistDto };
  }

   async updateJournalistVerification(JournalistID: string, updateJournalistDto: UpdateJournalistVerificationDto): Promise<JournalistEntity> {
      const journalist = await this.findById(JournalistID); 
    
      journalist.VerificationStatus = updateJournalistDto.VerificationStatus;

      await this.journalistRepository.update(JournalistID, updateJournalistDto);
      return { ...journalist, ...updateJournalistDto };
  }

}



