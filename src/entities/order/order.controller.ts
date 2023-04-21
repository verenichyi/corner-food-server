import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() body: CreateOrderDto) {
    return await this.orderService.createOrder(body);
  }

  @Get(':id')
  async findUserInactiveOrders(@Param('id') id: string) {
    return await this.orderService.findUserInactiveOrders(id);
  }
}
