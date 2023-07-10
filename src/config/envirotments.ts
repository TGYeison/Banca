import dotenv from 'dotenv';

dotenv.config();

const { NAME_DB_TEST, NAME_DB, NODE_ENV } = process.env;

export const KEY_SECRET_TOKEN = "02d9ba42658d8f554ee677c0be2895b440ba2acf4d35c60278a3f44e444fcc647a"

const nameDatabase = NODE_ENV === 'test' ? NAME_DB_TEST : NAME_DB;

export const CONNECTION_DB = {
    BANCA_DB: {
        TYPE: "postgres",
        HOST: "localhost",
        PORT: 5432,
        USERNAME: "postgres",
        PASSWORD: "1q2w3e$R",
        DATABASE: nameDatabase,
    }
}