import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { Logic } from "../logic";
import { WordsController } from "./words.controller";
import { WordsService } from "./words.service";

@Module({
    imports: [HttpModule],
    controllers: [WordsController],
    providers: [WordsService,Logic],
  })
  export class WordsModule {}
  