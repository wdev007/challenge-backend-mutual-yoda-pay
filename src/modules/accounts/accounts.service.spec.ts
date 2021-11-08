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

    it('should be able return an exception when trying to create existing cpf account', async () => {
      const account = {
        name: 'Maria',
        cpf: '123123111-11',
        password: '12312311',
        address: 'Rua 2',
        phone: '(81) 98889-2121',
      };

      await service.create(account);

      expect(service.create(account)).rejects.toThrow('Account already exists');
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

  describe('update', () => {
    it('should be able update accounts', async () => {
      const { id } = await service.create({
        name: 'Maria',
        cpf: '123123111-11',
        password: '12312311',
        address: 'Rua 2',
        phone: '(81) 98889-2121',
      });
      const dto = {
        address: 'Rua 3',
      };

      const response = await service.update(id, dto);

      expect(response.address).toEqual(dto.address);
    });

    it('should be able return an exception when account does not exist', async () => {
      expect(service.update(10, { address: 'Rua A' })).rejects.toThrow(
        'Account does not exists',
      );
    });
  });

  describe('enable', () => {
    it('should be able enable accounts', async () => {
      const { id } = await service.create({
        name: 'Maria',
        cpf: '123123111-11',
        password: '12312311',
        address: 'Rua 2',
        phone: '(81) 98889-2121',
      });

      await service.disable(id);

      const response = await service.enable(id);

      expect(response.disabled_at).toBeNull();
    });

    it('should be able return an exception when account does not exist', async () => {
      expect(service.enable(10)).rejects.toThrow('Account does not exists');
    });

    it('should be able return an exception when account is already enable', async () => {
      const { id } = await service.create({
        name: 'Maria',
        cpf: '123123111-11',
        password: '12312311',
        address: 'Rua 2',
        phone: '(81) 98889-2121',
      });

      expect(service.enable(id)).rejects.toThrow('Account is already enable');
    });
  });

  describe('disable', () => {
    it('should be able disable accounts', async () => {
      const { id } = await service.create({
        name: 'Maria',
        cpf: '123123111-11',
        password: '12312311',
        address: 'Rua 2',
        phone: '(81) 98889-2121',
      });

      await service.disable(id);

      const response = await service.findAll({ skip: 1, page: 1 });

      expect(response.data[0].disabled_at).toBeTruthy();
    });

    it('should be able return an exception when account does not exist', async () => {
      expect(service.disable(10)).rejects.toThrow('Account does not exists');
    });

    it('should be able return an exception when account is already disable', async () => {
      const { id } = await service.create({
        name: 'Maria',
        cpf: '123123111-11',
        password: '12312311',
        address: 'Rua 2',
        phone: '(81) 98889-2121',
      });

      await service.disable(id);

      expect(service.disable(id)).rejects.toThrow('Account is already disable');
    });
  });
});
