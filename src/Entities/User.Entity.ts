import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, JoinColumn, JoinTable } from 'typeorm';

import { Account } from './Account.Entity';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({unique: true})
    userName: string;

    @Column()
    name: string;

    @Column()
    lastName: string;

    @Column()
    docID: string;

    @Column()
    phone: string;

    @Column()
    password: string;

    @JoinTable()
    @OneToMany(()=> Account, (account: Account) => account.user, { cascade: true})
    accounts: Account[];
}