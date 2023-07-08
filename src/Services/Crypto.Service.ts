import bcrypt from "bcrypt";

export default class CryptoServices {
    private readonly  salt = 10;

    async Encode(key: string) : Promise<string> {
        const hash =  await bcrypt.hash(key, this.salt);
        return hash;
    }

    Compare(inputPassword:string, password: string,) : Promise<Boolean> {
        const result = bcrypt.compare(inputPassword, password);
        return result;   
    }
}