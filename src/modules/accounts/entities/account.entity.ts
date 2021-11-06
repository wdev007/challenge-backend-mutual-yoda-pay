import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  phone: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  address: string;

  @CreateDateColumn()
  created_at: string;

  @DeleteDateColumn()
  disabled_at: string;
}
