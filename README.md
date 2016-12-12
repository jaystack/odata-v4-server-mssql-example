# odata-v4-server-mssql-example
MS SQL Server example for **[JayStack OData V4 Server](http://jaydata.org/jaystack-odata-v4-server)**

## About JayStack OData V4 Server (odata-v4-server)
With JayStack OData v4 Server you can build your own data endpoints without the hassle of implementing any protocol-level code. This framework binds OData v4 requests to your annotated controller functions, and compiles OData v4 compatible response. Clients can access services through OData-compliant HTTP requests. We recommend the JayData library for consuming OData v4 APIs.

This example uses **JayStack OData V4 Server [(odata-v4-server)](http://jaydata.org/jaystack-odata-v4-server)** and [odata-v4-mssql](https://github.com/jaystack/odata-v4-mssql) libraries.

You can build your own OData v4 compatible service step-by-step by following this [tutorial](http://jaydata.org/blog/jaystack-odata-v4-server-with-mongodb-tutorial)

Also, there are sevaral client examples at **JayStack OData V4 Server (odata-v4-server)**:
- [client example using React](https://github.com/jaystack/odata-v4-server-react-client-example)
- [server example using MySql](https://github.com/jaystack/odata-v4-mysql-example)
- [server example using PostgreSql](https://github.com/jaystack/odata-v4-server-pgsql-example)
- [server example using MongoDb](https://github.com/jaystack/odata-v4-server-mongodb-example)

## Technical details of this example
### Setting up the database
You have to create the database manually using these commands:
```SQL
USE master;
Go
DROP DATABASE IF EXISTS northwind;
Go
CREATE DATABASE northwind;
Go
```

### Setting up the connection string to your MS SQL Server
You have to customize the db connection options
by editing [request.ts](https://github.com/jaystack/odata-v4-server-mssql-example/blob/master/src/request.ts#L3-L9).
These are the default options:
```js
const dbConfig = {
    driver: "msnodesqlv8",    // alternatively you can use "tedious" after installing it by 'npm i tedious'
    server: "DESKTOP-USER",   // use your real server name
                              // using "localhost" may result in duplicate rows in the recordset
    database: "northwind",    // mandatory
    user: "sa",               // your system administrator's username
    password: "***"           // your system administrator's password
};
```
By default, the DB server will listen on `port` `1433` so we did not include this parameter above.


### Building the application
Use command:
```
npm run build
```

### testing the application
Use command:
```
npm test
```

### Starting the application
Use command:
```
npm start
```

### Creating sample data
After starting the application (the API will listen on `localhost:3000` by default) you can generate / recreate the sample dataset
by submitting [localhost:3000/initDb](http://localhost:3000/initDb).
Alternatively, if you start unit tests (`npm test`), the database will be initialized automatically.

### Remarks
#### Default data sorting
Unlike other database systems, MS SQL Server will not order your recordset by default.
(Some database systems 'use' an implicit default ordering, depending on indices used in the query and on what order they are used.
This implicit sorting can change as the data/statistics change and the optimizer chooses different plans. In MS SQL Server this implicit ordering is missing.)
Therefore two unit tests
(for [/Products](localhost:3000/Products) and [/Categories](localhost:3000/Categories)) had to be 'hacked' to sort the resulting data.

If you want a default sorting eg. on 'Id' then you can achieve it
by adding these three lines to [controller.ts](https://github.com/jaystack/odata-v4-server-mssql-example/blob/master/src/controller.ts)
at line #153 and #17 (just before the return startement of the two `async find()` functions):
```js
if (!sqlQuery.orderby || sqlQuery.orderby == "1") {
  sqlQuery.orderby = "Id";
}
```
