import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CategoryService } from 'src/category/domain/inboundPorts/category.service';
import { CategoryEntity } from 'src/category/domain/model/category.entity';

@Controller('category')
@ApiTags('Category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  @ApiOkResponse({ type: CategoryEntity, isArray: true })
  async findAll(): Promise<CategoryEntity[]> {
    return await this.categoryService.findAll();
  }
}
