import { Repository } from 'typeorm';
import { Transaction } from './../Entities/Transaction.Entity';


class TransactionRepository extends Repository<Transaction> {}

export class TransactionServices {
    private transactionRepository: TransactionRepository;

    constructor(transaction: TransactionRepository) {
        this.transactionRepository = transaction;
    }

    public async Create (transaction: Transaction) {  
        try {
            const newTransaction = await this.transactionRepository.save(transaction);

            return newTransaction;
        } catch (error) {
            return  {status: 503, message: (error as Error).message};
        }
        
    }

    public async GetByReferent (id: string) {
        try {
            const transacctions = await this.transactionRepository.find({ 
                where: { accountRoot: {id}, accountDestination: {id}}
            });
                // .createQueryBuilder()
                // .where('accountRoot = :id', {id})
                // .orWhere('accountDestination = :id', {id})
                // .execute();
            
            return transacctions;
        } catch (error) {
            return  {status: 503, message: (error as Error).message};
        }
    }
}