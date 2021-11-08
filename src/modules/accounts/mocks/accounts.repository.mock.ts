import { CreateAccountDto, UpdateAccountDto } from '../dto';
import { EnableOrDisableType } from '../accounts.repository';
import { Account } from '../entities/account.entity';
import { PageDto, PageMetaDto, PageOptionsDto } from '../../../shared/dtos';

interface IFindOne {
  where: {
    cpf: string;
  };
}

export class AccountsRepositoryMock {
  private accounts: Account[] = [];
  private id = 1;

  async find({ withDeleted }) {
    if (withDeleted) return this.accounts;

    return this.accounts.filter((item) => !Boolean(item.disabled_at));
  }

  async findOne(isOrparams: IFindOne | number) {
    if (typeof isOrparams === 'number') {
      return this.accounts.find((item) => item.id === isOrparams);
    }
    return this.accounts.find((item) => item.cpf === isOrparams?.where.cpf);
  }
  async findWithDeleted(id: number) {
    return this.accounts.find((item) => item.id === id);
  }

  async updateAccount(account: Account, dto: UpdateAccountDto) {
    let accountUpdate;
    this.accounts = this.accounts.map((item) => {
      if (item.id === account.id) {
        accountUpdate = Object.assign(account, dto);
        return accountUpdate;
      }
      return item;
    });

    return accountUpdate;
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
  async enableOrDisable(account: Account, type: EnableOrDisableType) {
    const accountToSave = Object.assign(account, {
      disabled_at: type === 'enable' ? null : new Date(),
    });

    this.accounts = this.accounts.map((item) => {
      if (item.id === account.id) {
        return accountToSave;
      }
      return item;
    });

    return accountToSave;
  }
}
