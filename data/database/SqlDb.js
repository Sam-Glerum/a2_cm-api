const sql = require('mssql');

module.exports = class sqlDatabase {

    static async connectToSqlDb() {

        try {
            await sql.connect({
                user: process.env.sqlDbUser,
                password: process.env.sqlDbPassword,
                server: process.env.sqlDbHost,
                database: process.env.sqlDbName,
                encrypt: true
            });
            console.log('Connection with SQL database established');
            return Promise.resolve();
        } catch (error) {
            console.log(error);
            return Promise.reject();
        }
    }
};
