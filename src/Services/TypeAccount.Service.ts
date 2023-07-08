import { Repository } from 'typeorm';
import { TypeAccount } from '../Entities/TypeAccount.Entity';


class TypeAccountRepository extends Repository<TypeAccount> {}

export class TypeAccountServices {
    private typeAccountRepository: TypeAccountRepository;

    constructor(TypeAccount: TypeAccountRepository) {
        this.typeAccountRepository = TypeAccount;
    }

    public async GetById (id: number) {  
        try {
            return await this.typeAccountRepository.findOne({ where: { id: id}});
        } catch (error) {
            return  {status: 503, message: (error as Error).message};
        }
        
    }
}