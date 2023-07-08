import { Repository } from 'typeorm';
import { User } from '../Entities/User.Entity';
import CryptoServices from './Crypto.Service';


class UserRepository extends Repository<User> {}

export class UserServices {
    private userRepository: UserRepository;
    private cryptoService: CryptoServices;

    constructor(user: UserRepository, crypto: CryptoServices) {
        this.userRepository = user;
        this.cryptoService = crypto;
    }

    public async Create (user: User) {  
        try {
            const alreadyUser = await this.GetByUser(user.userName);
            if ((alreadyUser as User).name) return { status: 409};  

            const password = await this.cryptoService.Encode(user?.password);
            const newUser = {...user, password: password};

            const createdUser = await this.userRepository.save(newUser);

            return createdUser;
        } catch (error) {
            return  {status: 503, message: (error as Error).message};
        }
        
    }

    public async GetByUser (username: string): Promise<User | {status: number}> {
        try {
            const user = await this.userRepository.findOne({ 
                where: { userName: username} 
            });

            if(!user) return {status: 404};

            return user;

        } catch (error) {
            return  {status: 503};
        }
    }

    public async Authentication (username: string, password: string) {
        try {
            const userResponse: any  = await this.GetByUser(username);
            if(userResponse?.status) 
                return {status: 404, message: 'user not found'};
            
            const verifyPassword = await this.cryptoService
                .Compare(password, userResponse.password);
            if(!verifyPassword) 
                return {status: 401, message: 'credentials incorrect'};

            return verifyPassword;
        } catch (error) {
            return {status: 503, message: (error as Error).message}
        }
    }
}