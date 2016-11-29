import * as sql from "mssql";

const dbConfig = {
    driver: "msnodesqlv8",
    server: "DESKTOP-SZABOF",
    database: "northwind_mssql_test_db",
    user: "sa",
    password: "QWEasd123%"
};

let connection = null;

async function connect() {
    return connection || (connection = await new sql.Connection(dbConfig).connect());
}

export default async function(): Promise<any> {
    const connection = await connect();
    return new sql.Request(connection);
}