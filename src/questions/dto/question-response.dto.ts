import { ApiProperty } from '@nestjs/swagger';

export class QuestionResponseDto {
  @ApiProperty({
    description: 'Unique identifier for the question',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The title or heading of the question',
    example: 'Capital of France',
  })
  title: string;

  @ApiProperty({
    description:
      'The type of the question, e.g., multiple-choice, true-false, short-answer',
    example: 'multiple-choice',
  })
  type: string;

  @ApiProperty({
    description: 'A detailed description of the question',
    example: 'Identify the capital city of France from the given options.',
    required: false,
    nullable: true,
  })
  description: string | null;

  @ApiProperty({
    description: 'Time limit in seconds for answering the question',
    example: 30,
  })
  timeout: number;

  @ApiProperty({
    description: 'An array of possible choices for the question',
    type: [String],
    example: ['Paris', 'London', 'Berlin'],
  })
  choices: string[];

  @ApiProperty({
    description: 'The question text presented to the user',
    example: 'What is the capital of France?',
  })
  question: string;
}
