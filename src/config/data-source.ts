import { DataSource } from "typeorm";

import { User } from "../Entities/User.Entity";
import { Account } from "../Entities/Account.Entity";
import { Transaction } from "../Entities/Transaction.Entity";
import { TypeAccount } from "../Entities/TypeAccount.Entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1q2w3e$R",
    database: "bancaDB",
    entities: [User, Account, TypeAccount, Transaction],
    logging: true,
    synchronize: true,
});