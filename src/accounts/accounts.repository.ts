import { EntityRepository, Repository } from 'typeorm';
import { Account } from './entities/account.entity';

@EntityRepository(Account)
export class AccountsRepository extends Repository<Account> {}
