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
  ParseBoolPipe,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Controller('accounts')
@ApiTags('Accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @HttpCode(201)
  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }

  @Get()
  @ApiQuery({ name: 'all', type: 'boolean' })
  findAll(@Query('all', ParseBoolPipe) all) {
    return this.accountsService.findAll({ all });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.update(+id, updateAccountDto);
  }

  @HttpCode(201)
  @Post('enables/:id')
  enable(@Param('id') id: string) {
    return this.accountsService.enable(+id);
  }

  @HttpCode(204)
  @Delete('disables/:id')
  disable(@Param('id') id: string) {
    return this.accountsService.disable(+id);
  }
}
