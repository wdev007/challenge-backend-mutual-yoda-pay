import { Test, TestingModule } from '@nestjs/testing';
import { AccountsRepository } from './accounts.repository';
import { AccountsService } from './accounts.service';
import { AccountsRepositoryMock } from './mocks/accounts.repository.mock';

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

  describe('create', () => {
    it('should be able create a account', async () => {
      const account = {
        name: 'Maria',
        cpf: '123123111-11',
        password: '12312311',
        address: 'Rua 2',
        phone: '(81) 98889-2121',
      };

      const response = await service.create(account);

      expect(response).toHaveProperty('name');
      expect(response).toHaveProperty('cpf');
      expect(response).not.toHaveProperty('password');

      for (const prop in account) {
        if (prop === 'password') {
          expect(response[prop]).toBeUndefined();
          continue;
        }
        expect(account[prop]).toEqual(response[prop]);
      }
    });
  });

  describe('findAll', () => {
    it('should be able return all accounts', async () => {
      await service.create({
        name: 'Maria',
        cpf: '123123111-11',
        password: '12312311',
        address: 'Rua 2',
        phone: '(81) 98889-2121',
      });
      await service.create({
        name: 'Tonha',
        cpf: '123123111-12',
        password: '12312311',
        address: 'Rua 3',
        phone: '(81) 98889-2121',
      });

      const response = await service.findAll({ skip: 1, page: 1 });

      expect(response.data.length).toEqual(2);
    });
  });
});
