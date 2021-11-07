import { HttpException, HttpStatus } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

export type EnableOrDisableType = 'enable' | 'disable';

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

  async updateAccount(id: number, dto: UpdateAccountDto) {
    const found = await this.findOne(id);

    if (!found) {
      throw new HttpException('Account does not exist', HttpStatus.NOT_FOUND);
    }

    const accountToSave = this.create(Object.assign(found, dto));

    await this.save(accountToSave);

    return accountToSave;
  }

  async enableOrDisable(id: number, type: EnableOrDisableType) {
    const found = await this.findOne(id, {
      withDeleted: true,
    });

    if (!found) {
      throw new HttpException('Account does not exist', HttpStatus.NOT_FOUND);
    }

    if (type === 'enable' && !found.disabled_at) {
      throw new HttpException(
        'Account is already active',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (type === 'disable' && found.disabled_at) {
      throw new HttpException(
        'Account is already disabled',
        HttpStatus.BAD_REQUEST,
      );
    }

    const accountToSave = this.create(
      Object.assign(found, {
        disabled_at: type === 'enable' ? null : new Date(),
      }),
    );

    await this.save(accountToSave);

    return accountToSave;
  }
}
