import "reflect-metadata";

import app from "./app";
import { AppDataSource } from "./config/data-source";

async function main () {
    try {
        await AppDataSource.initialize();

        app.listen(3000);
        console.log("listening on port 3000");
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

main();

