import {
  Controller, Get, Post, Put, Delete,
  Body, Param, UseGuards, Request
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ProductService } from './product.service';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get('farmer/:id')
  getProductsByFarmer(@Param('id') id: string) {
    return this.productService.getProductsByFarmer(id);
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productService.getProductById(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  createProduct(@Body() dto: any, @Request() req) {
    return this.productService.createProduct(dto, req.user.userId);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  updateProduct(@Param('id') id: string, @Body() dto: any) {
    return this.productService.updateProduct(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}