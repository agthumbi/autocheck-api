import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { AuthService } from "../auth/auth.service";
import { Logic } from "../logic";
import { WordsController } from "./words.controller";
import { WordsService } from "./words.service";
import { JwtService } from "@nestjs/jwt";
import { AuthModule } from "../auth/auth.module";
import { PassportModule } from "@nestjs/passport";

@Module({
    imports: [HttpModule,AuthModule,PassportModule],
    controllers: [WordsController],
    providers: [WordsService,Logic],
  })
  export class WordsModule {}
  