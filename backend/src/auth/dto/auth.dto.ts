import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AuthDto {
  @IsOptional()
  @ApiProperty({
    example: 'raam lala',
    required: false,
  })
  name: string;
  @ApiProperty({
    example: 'shivam@gmail.com',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    example: '123456789',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
