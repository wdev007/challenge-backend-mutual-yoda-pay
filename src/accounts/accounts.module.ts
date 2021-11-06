import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { AccountsRepository } from './accounts.repository';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Account } from './entities/account.entity';

@Module({
  // imports: [TypeOrmModule.forFeature([Account, AccountsRepository])],
  controllers: [AccountsController],
  providers: [AccountsService, AccountsRepository],
})
export class AccountsModule {}
