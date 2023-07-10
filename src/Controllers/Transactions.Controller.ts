import { Response, Request, Router } from "express";
import { AccountServices } from "../Services/Account.Service";
import { TransactionServices } from "../Services/Transaction.Service";

export default class TransactionController {
    protected router: Router;
    protected transactionServices: TransactionServices;
    protected accountServices: AccountServices;

    constructor(TransactionServices: TransactionServices, AccountServices: AccountServices) {
        this.transactionServices = TransactionServices;
        this.accountServices = AccountServices;
        this.router = new (Router as any)();
    }

    async Register (req: Request, res: Response)  {
        const transaction = req.body;
        if(!transaction.amount || !transaction.accountDestination || !transaction.accountRoot)
            return res.status(409).json({ error: 'Invalid request' });

        const accountRoot = await this.accountServices
            .GetById(transaction.accountRoot as string);
        if(!accountRoot) 
            return res.status(404).json({ error: 'account origin not found' });

        accountRoot.balance -= transaction.amount; 
        await this.accountServices.Update(accountRoot);
        transaction.accountRoot = accountRoot;

        
        const accountDestination = await this.accountServices
            .GetById(transaction.accountDestination as string);
        if(!accountDestination) 
            return res.status(404).json({ error: 'account destination not found' });

        accountDestination.balance += transaction.amount;
        await this.accountServices.Update(accountDestination);
        transaction.accountDestination = accountDestination;

        const newTransaction: any = await this.transactionServices.Create(transaction);
        if(newTransaction.status) 
            return res.status(newTransaction.status).json({ message: newTransaction.message});
        
        res.status(201).json(newTransaction);
    }

    routes () {
        this.router.post('/', (req: Request, res: Response) => this.Register(req, res));

        return this.router;
    }
}