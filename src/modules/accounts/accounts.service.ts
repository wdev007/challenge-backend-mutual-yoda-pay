import { Injectable } from '@nestjs/common';
import { AccountsRepository } from './accounts.repository';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { FiltersGetAccounts } from './interfaces/filters-get-accounts';

@Injectable()
export class AccountsService {
  constructor(private readonly accountRepository: AccountsRepository) {}

  async create(createAccountDto: CreateAccountDto) {
    return this.accountRepository.createAccount(createAccountDto);
  }

  async findAll(filters: FiltersGetAccounts) {
    const { all: withDeleted } = filters;

    return this.accountRepository.find({
      withDeleted,
    });
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    return this.accountRepository.updateAccount(id, updateAccountDto);
  }

  async enable(id: number) {
    return this.accountRepository.enableOrDisable(id, 'enable');
  }

  async disable(id: number) {
    return this.accountRepository.enableOrDisable(id, 'disable');
  }
}
