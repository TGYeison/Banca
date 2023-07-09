import { AccountServices } from './../Services/Account.Service';
import { Response, Request, Router } from "express";
import { UserServices } from "../Services/User.Service";
import { TypeAccountServices } from '../Services/TypeAccount.Service';
import AuthServices from '../Services/Auth.Service';
import { TransactionServices } from '../Services/Transaction.Service';

export default class AccountController {
    protected router: Router;
    protected accountServices: AccountServices;
    protected userServices: UserServices;
    protected typeAccountServices: TypeAccountServices;
    protected authServices: AuthServices;
    protected transactionServices: TransactionServices;

    constructor(
        AccountServices: AccountServices, 
        UserServices: UserServices, 
        TypeAccountServices: TypeAccountServices, 
        AuthServices: AuthServices,
        TransactionServices: TransactionServices
    ) {
        this.userServices = UserServices;
        this.accountServices = AccountServices;
        this.typeAccountServices = TypeAccountServices;
        this.authServices = AuthServices;
        this.transactionServices = TransactionServices;
        this.router = new (Router as any)();
    }

    async Register (req: Request, res: Response)  {
        const usename = req.headers.authorization;
        
        const body = req.body;

        const userResponse: any = await this.userServices.GetByUser(usename as string);
        body.user = userResponse;

        const typeResponse = await this.typeAccountServices.GetById(body.typeAccount as number);
        body.typeAccount = typeResponse;

        const newAccount = await this.accountServices.Create(body);
        
        res.status(201).json(newAccount);
    }

    async Get (req: Request, res: Response) {
        const usename = req.headers.authorization;

        const userResponse: any = await this.userServices.GetByUser(usename as string);
        if (userResponse?.status) 
            return res.status(userResponse.status).json(userResponse.message);

        const accounst: any = await this.accountServices.GetByReferent(userResponse.id);
        if (accounst.status) 
            return res.status(userResponse.status).json(userResponse.message);

        res.status(200).json(accounst);
    }

    async GetByIdTransactions (req: Request, res: Response) {
        const id = req.params.id;

        if (!id) 
            return res.status(409).json({ message: 'Need id account' });

        const transaction: any = await this.transactionServices.GetByReferent(id as string);
        if(transaction?.status)
            return res.status(transaction.status).json({ message: 'Account invalid' }); 


        res.status(200).json(transaction);
    }

    routes () {
        this.router.post('/', (req: Request, res: Response) => this.Register(req, res));
        this.router.get('/', (req: Request, res: Response) => this.Get(req, res));
        this.router.get('/:id/transactions', (req: Request, res: Response) => this.GetByIdTransactions(req, res));

        return this.router;
    }
}