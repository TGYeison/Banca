import { DataSource, DatabaseType } from "typeorm";

import { CONNECTION_DB } from "./envirotments";

import { User } from "../Entities/User.Entity";
import { Account } from "../Entities/Account.Entity";
import { Transaction } from "../Entities/Transaction.Entity";
import { TypeAccount } from "../Entities/TypeAccount.Entity";


export const AppDataSource = new DataSource({
    type: CONNECTION_DB.BANCA_DB.TYPE as any,
    host: CONNECTION_DB.BANCA_DB.HOST,
    port: CONNECTION_DB.BANCA_DB.PORT,
    username: CONNECTION_DB.BANCA_DB.USERNAME,
    password: CONNECTION_DB.BANCA_DB.PASSWORD,
    database: CONNECTION_DB.BANCA_DB.DATABASE,
    entities: [User, Account, TypeAccount, Transaction],
    logging: true,
    synchronize: true,
});