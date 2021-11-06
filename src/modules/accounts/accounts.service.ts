import { Injectable } from '@nestjs/common';
import { AccountsRepository } from './accounts.repository';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { FiltersGetAccounts } from './interfaces/filters-get-accounts';

@Injectable()
export class AccountsService {
  constructor(private readonly accountRepository: AccountsRepository) {}

  create(createAccountDto: CreateAccountDto) {
    return this.accountRepository.createAccount(createAccountDto);
  }

  findAll(filters: FiltersGetAccounts) {
    const { all: withDeleted } = filters;

    return this.accountRepository.find({
      withDeleted,
    });
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return this.accountRepository.update(id, updateAccountDto);
  }

  enable(id: number) {
    return this.accountRepository.enableOrDisable(id, 'enable');
  }

  disable(id: number) {
    return this.accountRepository.enableOrDisable(id, 'disable');
  }
}
