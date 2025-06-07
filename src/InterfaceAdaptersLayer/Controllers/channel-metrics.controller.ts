import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

import { CreateChannelMetricsDto } from 'src/ApplicationLayer/dto/ChannelMetricsDTOs/create-channel-metrics.dto';
import { ChannelMetricsResponseDto } from 'src/ApplicationLayer/dto/ChannelMetricsDTOs/get-channel-metrics.dto';
import { ResponseUpdateChannelMetricsDto } from 'src/ApplicationLayer/dto/ChannelMetricsDTOs/response-update-channel-metrics.dto';
import { UpdateChannelMetricsDto } from 'src/ApplicationLayer/dto/ChannelMetricsDTOs/update-channel-metrics.dto';
import { CreateChannelMetricsService } from 'src/ApplicationLayer/UseCases/ChannelMetricsUseCases/create-channel-metrics.service';
import { GetChannelMetricsService } from 'src/ApplicationLayer/UseCases/ChannelMetricsUseCases/get-channel-metrics.service';
import { UpdateChannelMetricsService } from 'src/ApplicationLayer/UseCases/ChannelMetricsUseCases/update-channel-metrics.service';
import { ChannelMetricsEntity } from 'src/DomainLayer/Entities/channelMetrics.entity';

@ApiTags('Channel Metrics')
@Controller('channel-metrics')
export class ChannelMetricsController {
  constructor(
    private readonly createService: CreateChannelMetricsService,
    private readonly findService: GetChannelMetricsService,
    private readonly updateService: UpdateChannelMetricsService,
  ) {}

  @Get('channel/:channelId')
  @ApiOperation({ summary: 'Get metrics by Channel ID' })
  async findByChannelId(
    @Param('channelId') ChannelID: string,
  ): Promise<ChannelMetricsResponseDto[]> {
    return await this.findService.getByChannelId(ChannelID);
  }

  @Post()
  @ApiOperation({ summary: 'Create channel metric' })
  @ApiBody({ type: CreateChannelMetricsDto })
  async create(
    @Body() dto: CreateChannelMetricsDto,
  ): Promise<ChannelMetricsEntity> {
    try {
      return await this.createService.create(dto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

@Patch()
@ApiOperation({ summary: 'Update channel metrics by Channel ID' })
@ApiBody({ type: UpdateChannelMetricsDto })
async update(
  @Body() dto: UpdateChannelMetricsDto,
): Promise<ResponseUpdateChannelMetricsDto> {
  return await this.updateService.update(dto);
}

}
