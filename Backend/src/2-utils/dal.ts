import mysql from "mysql";
import config from "./config";

const connection = mysql.createPool({
    host: config.mysqlHost,
    user: config.mysqlUser,
    password: config.mysqlPassword,
    database: config.mysqlDatabase
});

console.log("We're connected to MySQL");

function execute(sql: string, values?: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        connection.query(sql, values, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

export default {
    execute
};