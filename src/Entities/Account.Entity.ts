import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, BaseEntity} from 'typeorm';
import { TypeAccount } from './TypeAccount.Entity';
import { Transaction } from './Transaction.Entity';
import { User } from './User.Entity';

@Entity()
export class Account extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    accountId: string;

    @ManyToOne(()=> TypeAccount, (type: TypeAccount) => type.id)
    typeAccount: TypeAccount;

    @Column()
    balance: number;

    @ManyToOne(()=> User, (user: User) => user.accounts)
    user: User;

    @OneToMany(() => Transaction, (transaction: Transaction) => transaction.accountRoot, { cascade: true })
    outTransactions: Transaction[];

    @OneToMany(() => Transaction, (transaction: Transaction) => transaction.accountDestination, {cascade: true})
    inputTransations: Transaction[];
}