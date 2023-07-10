import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, BaseEntity, JoinColumn } from 'typeorm';
import { Account } from './Account.Entity';

@Entity()
export class Transaction extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Account, (account: Account) => account.outTransactions)
    accountRoot: Account;

    @ManyToOne(() => Account, (account: Account) => account.inputTransations)
    accountDestination: Account;

    @Column()
    amount: number;

    @CreateDateColumn()
    createdDate: Date;
}