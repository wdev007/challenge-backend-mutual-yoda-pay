import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateAccountDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsPhoneNumber('BR')
  @MaxLength(15)
  phone?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(30)
  address?: string;
}
