import { HttpModule } from '@nestjs/axios';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Logic } from '../logic';
import { WordsController } from './words.controller';

import { WordsService } from './words.service';
import * as request from 'supertest';

import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
var token: any;
let wordsController: WordsController;
let app: INestApplication;




describe('WordsController', () => {
  beforeAll(async () => {


    const moduleRef = await Test.createTestingModule({
      controllers: [WordsController],
      providers: [WordsService, Logic, AuthService, UsersService, JwtService],
      imports: [HttpModule],
    })

      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
    // var response = await request(app.getHttpServer())
    //   .post('/auth/login')
    //   .send({ username: 'Antony', password: 'Thumbi' });
    // token = response.body.access_token
    // console.log(token)
  });



  let freqwords

  describe('Top 10 most occurring words in the titles of the last 25 stories', () => {
    it('Return Top 10 most occurring words in the titles of the last 25 stories"', async () => {
      freqwords = await wordsController.getMostWordsLast25Stories()
     // expect(freqwords)
    });
  });
  describe('Top 10 most occurring words in the titles of the post of exactly the last week', () => {
    it('Return Top 10 most occurring words in the titles of the post of exactly the last week', async () => {
      freqwords = await wordsController.getMostWordsExactLastWeek()
     // expect(freqwords)
    });
  });
  describe('Top 10 most occurring words in titles of the last 600 stories of users with at least 10.000 karma', () => {
    it('Return Top 10 most occurring words in titles of the last 600 stories of users with at least 10.000 karma', async () => {
      freqwords = await wordsController.getMost10WordsInTitles10kKarma()
      //expect(freqwords)
    });

  });
});
