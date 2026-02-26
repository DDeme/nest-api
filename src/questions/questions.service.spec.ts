import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { QuestionsService } from './questions.service';
import { DRIZZLE } from '../database/drizzle.module';

describe('QuestionsService', () => {
  let service: QuestionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionsService, { provide: DRIZZLE, useValue: {} }],
    }).compile();

    service = module.get<QuestionsService>(QuestionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
