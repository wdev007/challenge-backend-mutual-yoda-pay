import { CreateAccountDto } from '../dto';
import { EnableOrDisableType } from '../accounts.repository';
import { Account } from '../entities/account.entity';
import { PageDto, PageMetaDto, PageOptionsDto } from '../../../shared/dtos';

export class AccountsRepositoryMock {
  private accounts: Account[] = [];
  private id = 1;

  async find({ withDeleted }) {
    if (withDeleted) return this.accounts;

    return this.accounts.filter((item) => !Boolean(item.disabled_at));
  }

  async findWhitPagination(pageOptionsDto: PageOptionsDto) {
    const pageMetaDto = new PageMetaDto({
      itemCount: this.accounts.length,
      pageOptionsDto,
    });
    return new PageDto(this.accounts, pageMetaDto);
  }

  async createAccount(dto: CreateAccountDto) {
    const account = {
      ...dto,
      id: this.id,
      created_at: new Date().toString(),
      disabled_at: '',
    };

    delete account.password;

    this.accounts.push(account);

    this.id += 1;

    return account;
  }
  async enableOrDisable(id: number, type: EnableOrDisableType) {
    const found = this.accounts.find((item) => item.id === id);

    if (!found) return;

    const disabled_at = type === 'enable' ? null : new Date().toString();

    this.accounts = this.accounts.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          disabled_at,
        };
      }
      return item;
    });

    return Object.assign(found, { disabled_at });
  }
}
