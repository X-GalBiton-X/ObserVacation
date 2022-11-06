import { NextFunction, Request, Response } from "express";
import fsPromises from "fs/promises";

const logFileName = "src/1-assets/log/error-log.txt";

async function catchAll(err: any, request: Request, response: Response, next: NextFunction): Promise<void> {

    console.log(err);
    await fsPromises.appendFile(logFileName, `${err.message} \n--------------------------------------------\n`);
    const statusCode = err.status ? err.status : 500;
    response.status(statusCode).send(err.message);

}

export default catchAll;