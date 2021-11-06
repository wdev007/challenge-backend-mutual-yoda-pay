import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

class AccountsServiceMock {
  private accounts: Account[] = [];
  private id = 1;

  async create(dto: CreateAccountDto) {
    const account = {
      ...dto,
      id: this.id,
      created_at: new Date().toString(),
      disabled_at: '',
    };

    this.accounts.push(account);

    this.id += 1;

    return account;
  }
  async findAll() {
    return this.accounts;
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

    const accountToSave = Object.assign(found, { disabled_at: new Date() });

    return accountToSave;
  }
  async disable(id: number) {
    const found = this.accounts.find((item) => item.id === id);

    if (!found) return false;

    const accountToSave = Object.assign(found, { disabled_at: null });

    return accountToSave;
  }
}

describe('AccountsController', () => {
  let controller: AccountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountsController],
      providers: [
        {
          provide: AccountsService,
          useClass: AccountsServiceMock,
        },
      ],
    }).compile();

    controller = module.get<AccountsController>(AccountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
