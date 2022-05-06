import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { CatController } from './cat/cat.controller';

@Module({
  imports: [BoardModule],
  controllers: [AppController, CatController],
  providers: [AppService],
})
export class AppModule {}
