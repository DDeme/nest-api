import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionResponseDto } from './dto/question-response.dto';

@ApiTags('questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new question' })
  @ApiResponse({
    status: 201,
    description: 'Question created successfully',
    type: QuestionResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  create(
    @Body() createQuestionDto: CreateQuestionDto,
  ): Promise<QuestionResponseDto> {
    return this.questionsService.create(createQuestionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all questions' })
  @ApiResponse({
    status: 200,
    description: 'List of all questions',
    type: [QuestionResponseDto],
  })
  findAll(): Promise<QuestionResponseDto[]> {
    return this.questionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a question by ID' })
  @ApiResponse({
    status: 200,
    description: 'Question found',
    type: QuestionResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Question not found' })
  findOne(@Param('id') id: string): Promise<QuestionResponseDto> {
    return this.questionsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a question' })
  @ApiResponse({
    status: 200,
    description: 'Question updated successfully',
    type: QuestionResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Question not found' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ): Promise<QuestionResponseDto> {
    return this.questionsService.update(+id, updateQuestionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a question' })
  @ApiResponse({
    status: 200,
    description: 'Question deleted successfully',
    type: QuestionResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Question not found' })
  remove(@Param('id') id: string): Promise<QuestionResponseDto> {
    return this.questionsService.remove(+id);
  }
}
