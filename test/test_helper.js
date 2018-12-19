const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
    const DATABASE_NAME = process.env.dbName;
    const dbUser = process.env.dbUser;
    const dbPassword = process.env.dbPassword;
    const CONNECTION_STRING = 'mongodb+srv://' + dbUser + ':' + dbPassword + '@cm-a2-c2mt3.mongodb.net/'+ DATABASE_NAME +'?retryWrites=true';

    // Establish a connection with the cm-a2 database (hosted on Atlas)
    mongoose.connect(CONNECTION_STRING, {useNewUrlParser: true});
    // Print a message after the connection with the database has been made
    mongoose.connection
        .once('open', () => {
            console.log("Connected to the database " + DATABASE_NAME);
            done();
        })
        .on('error', (error) => {
            console.warn('Warning', error);
        });
});

beforeEach((done) => {
    const { users } = mongoose.connection.collections;
    users.drop(() => {
        done();
    })
});