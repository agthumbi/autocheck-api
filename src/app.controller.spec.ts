

import { AppController } from './app.controller';
import * as request from 'supertest';
import { AppService } from './app.service';
import { WordsModule } from './words/words.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { Test } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { response } from 'express';

describe('AppController', () => {
  let appController: AppController;
  let app: INestApplication;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule, WordsModule, AuthModule, PassportModule],
      controllers: [AppController],
      providers: [AppService],
    })

      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  })

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      await request(app.getHttpServer())
      .get('/')
      .set('Accept', 'application/json')
      .send()
      .expect(response=>response.text)

   
    });
  });


});
