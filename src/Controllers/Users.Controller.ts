import { Response, Request, Router } from "express";
import { UserServices } from "../Services/User.Service";
import AuthServices from "../Services/Auth.Service";

export default class UserController {
    protected router: Router;
    protected userServices: UserServices;
    protected authServices: AuthServices;

    constructor(UserServices: UserServices, AuthServices: AuthServices) {
        this.userServices = UserServices;
        this.authServices = AuthServices;
        this.router = new (Router as any)();
    }

    async Register(req: Request, res: Response) {
        const body = req.body;
        if(!body?.name || !body?.lastName || !body?.userName || 
            !body?.password || !body?.phone || !body?.docID)
            return res.status(409).json({message: 'Invalid date user registration'});


        const user:any = await this.userServices.Create(body);
        if(!user?.userName) 
            return res.status(403).json({message: 'Cannot create user'});
        
        const token = await this.authServices.Generate(user.userName);
        res.status(201).json({token: token});
    }

    async LogIn (req: Request, res: Response) {
        const body = req.body;
        if (!body.userName || !body.password)  
            return res.status(409).json({message: 'Invalid user registration'});

        const authenticateCredentials: any = await this.userServices
            .Authentication(body.userName, body.password);
        if(authenticateCredentials?.status)
            return res.status(authenticateCredentials?.status).json({message: authenticateCredentials?.message});
        
        const token = await this.authServices.Generate(body.userName);
        res.status(200).json({token: token});
    }

    routes () {
        this.router.post('/register', (req: Request, res: Response) => this.Register(req, res));
        this.router.post('/login', (req: Request, res: Response) => this.LogIn(req, res));

        return this.router;
    }
}