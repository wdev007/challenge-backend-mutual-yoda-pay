import { Test, TestingModule } from '@nestjs/testing';
import { AccountsRepository, EnableOrDisableType } from './accounts.repository';
import { AccountsService } from './accounts.service';
import { Account } from './entities/account.entity';

class AccountsRepositoryMock {
  async createAccount() {
    return new Account();
  }
  async enableOrDisable(id: number, type: EnableOrDisableType) {
    return false;
  }
}

describe('AccountsService', () => {
  let service: AccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsService,
        {
          provide: AccountsRepository,
          useClass: AccountsRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<AccountsService>(AccountsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
