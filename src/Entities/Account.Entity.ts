import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToOne} from 'typeorm';
import { TypeAccount } from './TypeAccount.Entity';
import { Transaction } from './Transacction.Entity';
import { User } from './User.Entity';

@Entity()
export class Account {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    accountId: string;

    @ManyToOne(()=> TypeAccount, (type: TypeAccount) => type.id)
    @JoinColumn()
    typeAccount: TypeAccount;

    @Column()
    balance: number;

    @ManyToOne(()=> User, (user: User) => user.accounts)
    userId: User;

    @OneToMany(() => Transaction, (transaction: Transaction) => transaction.accountRoot)
    outTransactions: Transaction[];

    @OneToMany(() => Transaction, (transaction: Transaction) => transaction.accountDestination)
    inputTransations: Transaction[];
}