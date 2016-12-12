# odata-v4-server-mssql-example
MS SQL Server example for **[JayStack OData V4 Server](http://jaydata.org/jaystack-odata-v4-server)**

## About JayStack OData V4 Server (odata-v4-server)
This example uses **JayStack OData V4 Server [(odata-v4-server)](http://jaydata.org/jaystack-odata-v4-server)** and [odata-v4-mssql](https://github.com/jaystack/odata-v4-mssql) libraries.

You build your own OData v4 compatible service step-by-step by following this [tutorial](http://jaydata.org/blog/jaystack-odata-v4-server-with-mongodb-tutorial)

Also there are sevaral client examples on **JayStack OData V4 Server (odata-v4-server)**:
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
By default, these are the options:
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
By default, the server will listen on `port` `1433` therefore it is not set above.


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
After starting the application (it will listen on `localhost:3000` by default) you can generate / recreate the sample dataset
by submitting [localhost:3000/initDb](http://localhost:3000/initDb).
Alternatively if you start unit tests (`npm test`) then the database will be initialized automatically.

### Remarks
#### Default data sorting
Unlike other database systems, MS SQL Server will not order your recordset by default.
(Some database systems 'use' an implicit default ordering depending on indexes used in the query and in what order they are used.
This implicit sorting can change as the data/statistics change and the optimizer chooses different plans. In MS SQL Server this implicit ordering is missing.)
Therefore two unit tests
(for [/Products](localhost:3000/Products) and [/Categories](localhost:3000/Categories)) got to be 'hacked' to sort the resulting data.

If you want a default sorting eg. on 'Id' then you can acheive it
by adding these three lines to [controller.ts](https://github.com/jaystack/odata-v4-server-mssql-example/blob/master/src/controller.ts)
at line #153 and #17 (just before the return startement of the two `async find()` functions):
```js
if (!sqlQuery.orderby || sqlQuery.orderby == "1") {
  sqlQuery.orderby = "Id";
}
```
