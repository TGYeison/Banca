import { Response, Request, Router } from "express";
import { UserServices } from "../Services/User.Service";

export default class UserController {
    protected router: Router;
    protected userServices: UserServices;

    constructor(UserServices: UserServices) {
        this.userServices = UserServices;
        this.router = new (Router as any)();
    }

    async Register(req: Request, res: Response) {
        const body = req.body;
        if(!body?.name || !body?.lastName || !body?.userName || 
            !body?.password || !body?.phone || !body?.docID)
            return res.status(409).json({message: 'Invalid date user registration'});


        const user = await this.userServices.Create(body);
        res.status(201).json(user);
    }

    async LogIn (req: Request, res: Response) {
        const body = req.body;
        if (!body.userName || !body.password)  
            return res.status(409).json({message: 'Invalid user registration'});

        const authenticateCredentials: any = await this.userServices
            .Authentication(body.userName, body.password);
        if(authenticateCredentials?.status)
            return res.status(authenticateCredentials?.status).json({message: authenticateCredentials?.message});
        
        res.status(200).json({message: 'Authentication successful'});
    }

    routes () {
        this.router.post('/register', (req: Request, res: Response) => this.Register(req, res));
        this.router.post('/login', (req: Request, res: Response) => this.LogIn(req, res));

        return this.router;
    }
}