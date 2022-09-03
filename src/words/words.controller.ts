import { Controller, Get, Header, Post, UseGuards,Request } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import { LocalAuthGuard } from "../auth/local-auth.guard";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { WordsService } from "./words.service";


@Controller('words')

export class WordsController {
    constructor(private readonly wordsService:WordsService,private readonly authService: AuthService) { }


  
    //Top 10 most occurring words in the titles of the last 25 stories
    @Get('/last-25-stories')  
    @UseGuards(JwtAuthGuard)
    @Header('Content-Type','application/json') 
    getMostWordsLast25Stories() {
        return this.wordsService.getMost10WordsInTitlesLast25Stories();
    }
    //Top 10 most occurring words in the titles of the post of exactly the last week
    @Get('/week-stories')
    @UseGuards(JwtAuthGuard)
    @Header('Content-Type','application/json')
    getMostWordsExactLastWeek() {
        return this.wordsService.getMost10WordsInTitlesExactAWeek();
    }
    //Top 10 most occurring words in titles of the last 600 stories of users with at least 10.000 karma
    @Get('/10k-karmas')
    @UseGuards(JwtAuthGuard)
    @Header('Content-Type','application/json')
    getMost10WordsInTitles10kKarma(){
        return this.wordsService.getMost10WordsInTitles10kKarma();
    }

}