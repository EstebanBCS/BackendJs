import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto.js';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  ValidateIf,
  IsNumber,
  IsInt,
  IsUrl,
  Min,
  isString,
} from 'class-validator';

export class UpdateProductDto {
  @ValidateIf((_, value) => value !== undefined)
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  nombre?: string;

  @ValidateIf((_, value) => value !== undefined && value !== null)
  @IsString()
  @MaxLength(200)
  descripcion?: string | null;

  @ValidateIf((_, value) => value !== undefined && value !== null)
  @IsString()
  @MaxLength(50)
  categoria?: string | null;

  @ValidateIf((_, value) => value !== undefined)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  precio?: number;

  @ValidateIf((_, value) => value !== undefined)
  @IsInt()
  @Min(0)
  stock?: number;

  @ValidateIf((_, value) => value !== undefined && value !== null)
  @IsString()
  @MaxLength(50)
  marca?: string | null;

  @ValidateIf((_, value) => value !== undefined && value !== null)
  @IsUrl()
  imagen_url?: string | null;
}
