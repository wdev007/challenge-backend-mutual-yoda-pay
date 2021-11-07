import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { AccountsServiceMock } from './mocks/accounts.service.mock';

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

  describe('create', () => {
    it('should be able create a accout', async () => {
      const account = {
        name: 'Jonh',
        cpf: '123123123-11',
        password: '12345678',
        address: 'Rua A',
        phone: '(81) 99090-9090',
      };

      const response = await controller.create(account);

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
      await controller.create({
        name: 'Jonh',
        cpf: '123123123-11',
        password: '12345678',
        address: 'Rua A',
        phone: '(81) 99090-9090',
      });
      await controller.create({
        name: 'Jonh',
        cpf: '123123123-12',
        password: '12345678',
        address: 'Rua A',
        phone: '(81) 99090-9090',
      });

      const response = await controller.findAll({ skip: 1, page: 1 });

      expect(response.data.length).toEqual(2);
    });
  });

  describe('update', () => {
    it('shoulb be able update a account', async () => {
      const { id } = await controller.create({
        name: 'Jonh',
        cpf: '123123123-11',
        password: '12345678',
        address: 'Rua A',
        phone: '(81) 99090-9090',
      });

      const address = 'Rua B';

      const response = await controller.update(String(id), {
        address,
      });

      expect(response.address).toEqual(address);
    });
  });
});
