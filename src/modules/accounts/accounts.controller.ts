import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Query,
  // ParseBoolPipe,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { PageOptionsDto } from '../../shared/dtos/page-options.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { ApiPaginatedResponse } from 'src/shared/docs/api-paginated-response';
import { AccountDto } from './dto/account.dto';

@Controller('accounts')
@ApiTags('Accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiPaginatedResponse(AccountDto)
  // @ApiQuery({ name: 'all', type: 'boolean' })
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.accountsService.findAll(pageOptionsDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.update(+id, updateAccountDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('enables/:id')
  enable(@Param('id') id: string) {
    return this.accountsService.enable(+id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('disables/:id')
  disable(@Param('id') id: string) {
    return this.accountsService.disable(+id);
  }
}
