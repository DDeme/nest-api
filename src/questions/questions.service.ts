import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE } from '../database/drizzle.module';
import type { DrizzleDB } from '../database/drizzle.module';
import { questions } from '../database/schema';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionsService {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {}

  async create(createQuestionDto: CreateQuestionDto) {
    const [question] = await this.db
      .insert(questions)
      .values(createQuestionDto)
      .returning();
    return question;
  }

  async findAll() {
    return this.db.select().from(questions);
  }

  async findOne(id: number) {
    const [question] = await this.db
      .select()
      .from(questions)
      .where(eq(questions.id, id));

    if (!question) {
      throw new NotFoundException(`Question with id ${id} not found`);
    }

    return question;
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    const [question] = await this.db
      .update(questions)
      .set(updateQuestionDto)
      .where(eq(questions.id, id))
      .returning();

    if (!question) {
      throw new NotFoundException(`Question with id ${id} not found`);
    }

    return question;
  }

  async remove(id: number) {
    const [question] = await this.db
      .delete(questions)
      .where(eq(questions.id, id))
      .returning();

    if (!question) {
      throw new NotFoundException(`Question with id ${id} not found`);
    }

    return question;
  }
}
