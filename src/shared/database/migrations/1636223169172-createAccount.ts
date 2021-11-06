import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createAccount1636223169172 implements MigrationInterface {
  name = 'createAccount1636223169172';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'accounts',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'cpf',
            type: 'varchar',
            length: '12',
            isUnique: true,
          },
          {
            name: 'phone',
            type: 'varchar',
            length: '15',
          },
          {
            name: 'password',
            type: 'varchar',
            length: '20',
          },
          {
            name: 'address',
            type: 'varchar',
            length: '30',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'disabled_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('accounts');
  }
}
