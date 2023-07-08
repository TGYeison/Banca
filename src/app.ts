import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import { AppDataSource } from './Config/data-source';

import CryptoServices from './Services/Crypto.Service';

import { TypeAccount } from './Entities/TypeAccount.Entity';
import { TypeAccountServices } from './Services/TypeAccount.Service';

import { Transaction } from './Entities/Transaction.Entity';
import { TransactionServices } from './Services/Transaction.Service';
import TransactionController from './Controllers/Transactions.Controller';


import { Account } from './Entities/Account.Entity';
import { AccountServices } from './Services/Account.Service';
import AccountController from './Controllers/Accounts.Controller';

import { User } from './Entities/User.Entity';
import { UserServices } from './Services/User.Service';
import UserController from './Controllers/Users.Controller';


const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false}));

const cryptoService = new CryptoServices(); 

const typeAccountRepository = AppDataSource.getRepository(TypeAccount);
const userRepository = AppDataSource.getRepository(User);
const accountRepository = AppDataSource.getRepository(Account);
const transactionRepository = AppDataSource.getRepository(Transaction);

const typeAccountService = new TypeAccountServices(typeAccountRepository);
const userService = new UserServices(userRepository, cryptoService);
const accountService = new AccountServices(accountRepository);
const transactionService = new TransactionServices(transactionRepository);

app.use(new UserController(userService).routes());
app.use(new AccountController(accountService, userService, typeAccountService).routes());
app.use(new TransactionController(transactionService, accountService).routes());

export default app;