import { Module } from '@nestjs/common';
import {HttpModule} from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WordsModule } from './words/words.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';



@Module({
  imports: [HttpModule,WordsModule,AuthModule,PassportModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
