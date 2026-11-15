import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // endpoint post producto
  @Post()
  create(@Body() product: CreateProductDto) {
    return this.productsService.create(product);
  }

  // endpoint get all productos
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  // endpoint get producto por uuid
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  // endpoint de actualizar producto
  @Put(':id')
  update(@Param('id') id: string, @Body() product: UpdateProductDto) {
    return this.productsService.update(id, product);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
