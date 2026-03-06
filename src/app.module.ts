import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './products/product.module';
import { OrderModule } from './orders/order.module';
import { MessageModule } from './messages/message.module';
import { DisputeModule } from './disputes/dispute.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI!),
    AuthModule,
    ProductModule,
    OrderModule,
    MessageModule,
    DisputeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

