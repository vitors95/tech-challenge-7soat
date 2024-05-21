import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CustomerService } from 'src/customer/domain/inboundPorts/customer.service';
import { CustomerEntity } from 'src/customer/domain/model/customer.entity';
import { CreateCustomerDTO } from '../model/create-customer.dto';
import { UpdateCustomerDTO } from '../model/update-customer.dto';

@Controller('customer')
@ApiTags('Customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post()
  @ApiCreatedResponse({ type: CustomerEntity })
  async create(@Body() customerDTO: CreateCustomerDTO) {
    return await this.customerService.create(customerDTO);
  }

  @Get()
  @ApiOkResponse({ type: CustomerEntity, isArray: true })
  async list(): Promise<CustomerEntity[]> {
    return await this.customerService.list();
  }

  @Get(':id')
  @ApiOkResponse({ type: CustomerEntity })
  async retrieve(@Param('id') id: number): Promise<CustomerEntity> {
    console.log('search for id');
    return await this.customerService.retrieve(id);
  }

  @Get('check-if-exists/:taxpayerRegistry')
  @ApiOkResponse({ type: CustomerEntity })
  async retrieveByTaxpayerRegistry(
    @Param('taxpayerRegistry') taxpayerRegistry: string,
  ): Promise<CustomerEntity> {
    console.log('search for taxpayer');
    return await this.customerService.retrieveByTaxpayerRegistry(
      taxpayerRegistry,
    );
  }

  @Delete(':id')
  @ApiOkResponse()
  async delete(@Param('id') id: number) {
    return await this.customerService.delete(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: CustomerEntity })
  async update(
    @Param('id') id: number,
    @Body() customerDTO: UpdateCustomerDTO,
  ) {
    return await this.customerService.update(id, customerDTO);
  }
}
