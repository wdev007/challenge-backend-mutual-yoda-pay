import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AccountsRepository } from './accounts.repository';
import { PageOptionsDto } from '../../shared/dtos/page-options.dto';
import { CreateAccountDto, UpdateAccountDto } from './dto';

@Injectable()
export class AccountsService {
  constructor(private readonly accountRepository: AccountsRepository) {}

  async create(account: CreateAccountDto) {
    const found = await this.accountRepository.findOne({
      where: {
        cpf: account.cpf,
      },
    });

    if (found) {
      throw new HttpException('Account already exists', HttpStatus.BAD_REQUEST);
    }

    return this.accountRepository.createAccount(account);
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    return this.accountRepository.findWhitPagination(pageOptionsDto);
  }

  async update(id: number, dto: UpdateAccountDto) {
    const account = await this.accountRepository.findOne(id);

    if (!account) {
      throw new HttpException('Account does not exists', HttpStatus.NOT_FOUND);
    }

    return this.accountRepository.updateAccount(account, dto);
  }

  async enable(id: number) {
    const found = await this.accountRepository.findWithDeleted(id);

    if (!found) {
      throw new HttpException('Account does not exists', HttpStatus.NOT_FOUND);
    }

    if (!found.disabled_at) {
      throw new HttpException(
        'Account is already enable',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.accountRepository.enableOrDisable(found, 'enable');
  }

  async disable(id: number) {
    const found = await this.accountRepository.findWithDeleted(id);

    if (!found) {
      throw new HttpException('Account does not exists', HttpStatus.NOT_FOUND);
    }

    if (found.disabled_at) {
      throw new HttpException(
        'Account is already disable',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.accountRepository.enableOrDisable(found, 'disable');
  }
}
