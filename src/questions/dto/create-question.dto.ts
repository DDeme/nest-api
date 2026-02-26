import {
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
  IsNotEmpty,
  Max,
  Min,
  ArrayNotEmpty,
  Length,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateQuestionDto {
  @ApiProperty({
    description: 'The title or heading of the question',
    example: 'Capital of France',
    minLength: 3,
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  title: string;

  @ApiProperty({
    description:
      'The type of the question, e.g., multiple-choice, true-false, short-answer',
    example: 'multiple-choice',
    enum: ['multiple-choice', 'true-false', 'short-answer'],
  })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiPropertyOptional({
    description: 'A detailed description of the question',
    example: 'Identify the capital city of France from the given options.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Time limit in seconds for answering the question',
    example: 30,
    minimum: 1,
    maximum: 3600,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(3600)
  timeout?: number;

  @ApiPropertyOptional({
    description: 'An array of possible choices for the question',
    type: [String],
    example: ['Paris', 'London', 'Berlin'],
  })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  choices?: string[];

  @ApiProperty({
    description: 'The question text presented to the user',
    example: 'What is the capital of France?',
  })
  @IsString()
  @IsNotEmpty()
  question: string;
}
