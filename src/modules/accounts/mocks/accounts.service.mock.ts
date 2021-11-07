import { CreateAccountDto, UpdateAccountDto } from '../dto';
import { PageDto, PageMetaDto, PageOptionsDto } from '../../../shared/dtos';
import { Account } from '../entities/account.entity';

export class AccountsServiceMock {
  private accounts: Account[] = [];
  private id = 1;

  async create(dto: CreateAccountDto) {
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

  async findAll(pageOptionsDto: PageOptionsDto) {
    const accounts = this.accounts.map((item) => {
      delete item.password;
      return item;
    });

    const pageMetaDto = new PageMetaDto({
      itemCount: this.accounts.length,
      pageOptionsDto,
    });

    return new PageDto(accounts, pageMetaDto);
  }

  async update(id: number, dto: UpdateAccountDto) {
    const found = this.accounts.find((item) => item.id === id);

    if (!found) return false;

    const accountToSave = Object.assign(found, { ...dto });

    return accountToSave;
  }

  async enable(id: number) {
    const found = this.accounts.find((item) => item.id === id);

    if (!found) return false;

    const accountToSave = Object.assign(found, { disabled_at: null });

    this.accounts = this.accounts.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          disabled_at: null,
        };
      }
      return item;
    });

    return accountToSave;
  }

  async disable(id: number) {
    const found = this.accounts.find((item) => item.id === id);

    if (!found) return false;

    const disabled_at = new Date().toString();

    const accountToSave = Object.assign(found, { disabled_at });

    this.accounts = this.accounts.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          disabled_at,
        };
      }
      return item;
    });

    return accountToSave;
  }
}
