import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsGateway } from './notifications.gateway';
import { OrderModule } from '../order/order.module';

@Module({
  providers: [NotificationsGateway, NotificationsService],
  imports: [OrderModule],
})
export class NotificationsModule {}
