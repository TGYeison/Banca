import jwt from 'jsonwebtoken';
import { KEY_SECRET_TOKEN } from '../Config/envirotments';

export default class AuthServices {
    public async Generate(username: string) {
        const token = jwt.sign({ userName: username }, KEY_SECRET_TOKEN, { expiresIn: 30 * 60});

        return token;
    }

    public async Verify(token: string) {
        try {
            let responce;
            jwt.verify(token, KEY_SECRET_TOKEN, (err, decode:any) => {
                if(err) {
                    responce = { status: 401, message: err.message };
                }
                if(decode?.userName) {
                    
                    responce = decode?.userName
                }
            }); 

            return responce;
        } catch (error) {
            return { status: 401, message: (error as Error).message };
        }
        
    }
}