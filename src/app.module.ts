import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatController } from './cat/cat.controller';
import { CatService } from './cat/cat.service';
import { CatModule } from './cat/cat.module';
import { BoardModule } from './board/board.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    CatModule,
    BoardModule,
    UserModule,
    PostModule
  ],
  controllers: [AppController, CatController],
  providers: [AppService, CatService],
})
export class AppModule {}
