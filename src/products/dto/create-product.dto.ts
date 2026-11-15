import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsInt,
  IsPositive,
  Min,
  MaxLength,
  IsUrl,
  IsUUID,
} from 'class-validator';

export class CreateProductDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  nombre: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  descripcion?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  categoria?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  precio: number;

  @IsInt()
  @Min(0)
  stock: number;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  marca?: string;

  @IsOptional()
  @IsUrl()
  imagen_url?: string;
}
