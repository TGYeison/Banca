import { Account } from './../Entities/Account.Entity';
import { Repository } from 'typeorm';

class AccountRepository extends Repository<Account> {}

export class AccountServices {
    private acountRepository: AccountRepository;

    constructor(account: AccountRepository) {
        this.acountRepository = account;
    }

    async Create (account: Account) {
        try {
            const newAccount = await this.acountRepository.save(account);

            return newAccount;
        } catch (error) {
            return { status: 409, message: (error as Error).message}   
        }
        
    }

    async GetByReferent (id: string) {
        const accounts = await this.acountRepository.find({ 
            where: { user: { id } },
            relations: {
                typeAccount: true,
            }
        });

        return accounts;
    }

    async GetById (id: string) {
        const account = await this.acountRepository.findOneBy ({ id });

        return account;
    }

    async Update(account: Account) {
        const updateAccount = await this.acountRepository.update({ id: account.id}, account);

        return updateAccount;
    }
}