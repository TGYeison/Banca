import { AccountServices } from './../Services/Account.Service';
import { Response, Request, Router } from "express";
import { UserServices } from "../Services/User.Service";
import { TypeAccountServices } from '../Services/TypeAccount.Service';

export default class AccountController {
    protected router: Router;
    protected accountServices: AccountServices;
    protected userServices: UserServices;
    protected typeAccountServices: TypeAccountServices;

    constructor(AccountServices: AccountServices, UserServices: UserServices, TypeAccountServices: TypeAccountServices) {
        this.userServices = UserServices;
        this.accountServices = AccountServices;
        this.typeAccountServices = TypeAccountServices;
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

        const accounts: any = this.accountServices.GetByReferent(id as string);
        if(accounts?.status)
            return res.status(accounts.status).json({ message: 'Account invalid' }); 


        res.status(200).send(accounts);
    }

    routes () {
        this.router.post('/account', (req: Request, res: Response) => this.Register(req, res));
        this.router.get('/account', (req: Request, res: Response) => this.Get(req, res));
        this.router.get('/account/:id/transactions', (req: Request, res: Response) => this.GetByIdTransactions(req, res));

        return this.router;
    }
}