import { Test, TestingModule } from '@nestjs/testing';
import { AccountsRepository } from './accounts.repository';

describe('AccountsService', () => {
  let repository: AccountsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountsRepository],
    }).compile();

    repository = module.get<AccountsRepository>(AccountsRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
