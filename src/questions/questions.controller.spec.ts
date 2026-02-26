import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { DRIZZLE } from '../database/drizzle.module';

describe('QuestionsController', () => {
  let controller: QuestionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionsController],
      providers: [QuestionsService, { provide: DRIZZLE, useValue: {} }],
    }).compile();

    controller = module.get<QuestionsController>(QuestionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
