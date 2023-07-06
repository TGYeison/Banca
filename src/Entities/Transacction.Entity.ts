import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Account } from './Account.Entity';

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Account, (account: Account) => account.outTransactions)
    accountRoot: Account;

    @ManyToOne(() => Account, (account: Account) => account.inputTransations)
    accountDestination: Account;

    @Column()
    amount: number;

    @Column()
    createdDate: Date;
}