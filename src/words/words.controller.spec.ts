import { HttpModule } from '@nestjs/axios';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';



import * as request from 'supertest';

import { AppService } from '../app.service';
import { WordsModule } from './words.module';
import { AuthModule } from '../auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { AppController } from '../app.controller';


let app: INestApplication;




describe('WordsController', () => {

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule, WordsModule, AuthModule, PassportModule],
      controllers: [AppController],
      providers: [AppService],
    })

      .compile();

    app = moduleRef.createNestApplication();
    await app.init();


  });


  describe('Top 10 most occurring words in the titles of the last 25 stories', () => {
    it('Return Top 10 most occurring words in the titles of the last 25 stories"', async () => {

      await request(app.getHttpServer())
        .get('/words/last-25-stories')
        .set('Accept', 'application/json')
        .send()
        .expect(HttpStatus.UNAUTHORIZED);

    });
  });
  describe('Top 10 most occurring words in the titles of the post of exactly the last week', () => {
    it('Return Top 10 most occurring words in the titles of the post of exactly the last week', async () => {
      await request(app.getHttpServer())
        .get('/words/week-stories')
        .set('Accept', 'application/json')
        .send()
        .expect(HttpStatus.UNAUTHORIZED);


    });
  });
  describe('Top 10 most occurring words in titles of the last 600 stories of users with at least 10.000 karma', () => {
    it('Return Top 10 most occurring words in titles of the last 600 stories of users with at least 10.000 karma', async () => {
      await request(app.getHttpServer())
        .get('/words/10k-karmas')
        .set('Accept', 'application/json')
        .send()
        .expect(HttpStatus.UNAUTHORIZED);


    });

  });
});
