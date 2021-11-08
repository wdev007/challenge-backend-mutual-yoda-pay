import { EntityRepository, Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { PageMetaDto } from '../../shared/dtos/page-meta.dto';
import { PageOptionsDto } from '../../shared/dtos/page-options.dto';
import { PageDto } from '../../shared/dtos/page.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';
import { EnableOrDisableType } from './types/enable-or-disable-type';

@EntityRepository(Account)
export class AccountsRepository extends Repository<Account> {
  async findWithDeleted(id: number) {
    return this.findOne(id, { withDeleted: true });
  }

  async findWhitPagination(pageOptionsDto: PageOptionsDto) {
    const queryBuilder = this.createQueryBuilder('account');

    queryBuilder
      .orderBy('account.created_at', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }
  async createAccount(account: CreateAccountDto) {
    const accountToCreate = this.create(account);

    await this.save(accountToCreate);

    return accountToCreate;
  }

  async updateAccount(account: Account, dto: UpdateAccountDto) {
    const accountToUpadate = this.create(Object.assign(account, dto));

    await this.save(accountToUpadate);

    return accountToUpadate;
  }

  async enableOrDisable(account: Account, type: EnableOrDisableType) {
    const accountToSave = this.create(
      Object.assign(account, {
        disabled_at: type === 'enable' ? null : new Date(),
      }),
    );

    await this.save(accountToSave);

    return accountToSave;
  }
}
