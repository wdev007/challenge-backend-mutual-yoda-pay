import { HttpException, HttpStatus } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from './entities/account.entity';

@EntityRepository(Account)
export class AccountsRepository extends Repository<Account> {
  async createAccount(account: CreateAccountDto) {
    const found = await this.findOne({
      where: {
        cpf: account.cpf,
      },
    });

    if (found) {
      throw new HttpException('Account already exists', HttpStatus.BAD_REQUEST);
    }

    const accountCreated = this.create(account);

    await this.save(accountCreated);

    return accountCreated;
  }

  async activate(id: number) {
    const found = await this.findOne(id);

    if (found) {
      throw new HttpException('Account does not exist', HttpStatus.NOT_FOUND);
    }

    return this.update(id, {
      disabled_at: null,
    });
  }

  async deactivate(id: number) {
    const found = await this.findOne(id);

    if (found) {
      throw new HttpException('Account does not exist', HttpStatus.NOT_FOUND);
    }

    return this.update(id, {
      disabled_at: new Date().toLocaleString('pt-BR'),
    });
  }
}
