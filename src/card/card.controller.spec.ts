import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CardController } from './card.controller';
import { CardModule } from './card.module';
import * as request from 'supertest';
import { APP_PIPE } from '@nestjs/core';

describe('CardController', () => {
  let app: INestApplication;
  let controller: CardController;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CardModule],
      providers: [
        {
          provide: APP_PIPE,
          useClass: ValidationPipe,
        }
      ],
    })
      .compile();

      app = moduleRef.createNestApplication();
      await app.init();
  });

  describe('[POST] /card', () => {
    let cardPayload: any = {
      name: "RUANITO D SANTOS",
      card_number: "4111111111111111",
      expire_date: "10/30",
      cvv: "123"
    };

    it('should return 201', () => {
      return request(app.getHttpServer())
        .post('/card')
        .send(cardPayload)
        .expect(HttpStatus.CREATED);
    });

    it('should return 401', () => {
      return request(app.getHttpServer())
        .post('/card')
        .expect(HttpStatus.BAD_REQUEST)
        .expect({
          statusCode: 400,
          message: [
            'name must be longer than or equal to 1 characters',
            'card_number must be a number string',
            'card_number must be longer than or equal to 16 characters',
            'expire_date must be longer than or equal to 5 characters',
            'cvv must be longer than or equal to 3 characters'
          ],
          error: 'Bad Request'
        });
    });
  });
});
