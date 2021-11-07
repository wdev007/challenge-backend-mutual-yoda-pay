import { Test, TestingModule } from '@nestjs/testing';
import { AccountsRepository } from './accounts.repository';
import { Account } from './entities/account.entity';

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

  describe('enableOrDisable', () => {
    it('should be able eneble a account', async () => {
      const account: Account = {
        cpf: '123123123-22',
        address: 'Rua A',
        name: 'Maria',
        password: '12312312',
        phone: '(91) 99999-9999',
        id: 1,
        created_at: '',
        disabled_at: new Date().toString(),
      };
      jest.spyOn(repository, 'create').mockImplementation(() => account);
      jest
        .spyOn(repository, 'save')
        .mockImplementation(() => Promise.resolve(account));
      const findOneSpy = jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(account);
      const response = await repository.enableOrDisable(1, 'enable');

      expect(response.disabled_at).toBeNull();
      expect(findOneSpy).toHaveBeenCalledWith(1, { withDeleted: true });
    });

    it('should be able disable a account', async () => {
      const account: Account = {
        cpf: '123123123-22',
        address: 'Rua A',
        name: 'Maria',
        password: '12312312',
        phone: '(91) 99999-9999',
        id: 1,
        created_at: '',
        disabled_at: null,
      };
      jest.spyOn(repository, 'create').mockImplementation(() => account);
      jest
        .spyOn(repository, 'save')
        .mockImplementation(() => Promise.resolve(account));
      const findOneSpy = jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(account);
      const response = await repository.enableOrDisable(1, 'disable');

      expect(response.disabled_at).toBeTruthy();
      expect(findOneSpy).toHaveBeenCalledWith(1, { withDeleted: true });
    });
  });
});
