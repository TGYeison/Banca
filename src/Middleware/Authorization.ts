import { Request, Response, NextFunction } from "express";
import AuthServices from "../Services/Auth.Service";

export default class AuthorizationMiddleware {
    private authService: AuthServices;

    constructor(AuthService: AuthServices) {
        this.authService = AuthService;
    }

    authenticationToken = async(req:Request, res:Response, next:NextFunction) => {
        const token = req.headers.authorization as string;
        if(!token) 
            return res.status(401).json({ message: "Invalid token"});

        const decode:any = await this.authService.Verify(token);
        if(decode?.status) 
            return res.status(decode.status).json({ message: decode.message});

        req.headers.authorization = decode;
        
        next();
    }   
}