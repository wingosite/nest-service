import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {
  @ApiProperty({ required: true })
  readonly name: string;

  @ApiProperty({ required: false, default: false })
  readonly isShow: boolean;
}
