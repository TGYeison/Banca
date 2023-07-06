import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Account } from './Account.Entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    lastName: string;

    @Column()
    docID: number;

    @Column()
    phone: number;

    @Column()
    password: string;

    @OneToMany(()=> Account, (account: Account) => account.userId)
    accounts: Account[];
}