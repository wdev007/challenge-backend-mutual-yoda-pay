import { ApiProperty } from '@nestjs/swagger';

export class AccountDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  cpf: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  address: string;
}
