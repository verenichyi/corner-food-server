import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly paymentService: OrderService) {}

  @Post()
  async createOrder(@Body() body: CreateOrderDto) {
    return await this.paymentService.createOrder(body);
  }
}
