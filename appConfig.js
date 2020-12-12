var developmentDatabase = {
    postgres: {
    host: 'localhost',
    port: 5432,
    database: 'database_name',
    user: 'postgres',
    password: 'postgres'
    }
    }
    
    var connectionString = "postgressql://ffxmfiefbpnqez:2d8c9e106700252e1c86b99bb200c9c8492a7fb4ffa64c68740be4ed077610e6@ec2-79-125-64-18.eu-west-1.compute.amazonaws.com:5432/d5i9onqd0nhdkh?ssl=true";
    if (process.env.NODE_ENV == 'production') {
    //Production mode
    if (process.env.DATABASE_URL) {
    developmentDatabase =
    parseConnectionString(process.env.DATABASE_URL);
    } else {
    console.log("process.env.DATABASE_URL empty, connectionStringvariable used");
    developmentDatabase = parseConnectionString(connectionString);
    }
    }else{
    //Development mode
    developmentDatabase = parseConnectionString(connectionString);
    }
    function parseConnectionString(connectionString) {
    if (connectionString) {
    var myRegexp = /(\w+):(\w+)@(.+):(\w+)\/(\w+)/g;
    var match = myRegexp.exec(connectionString);
    if (match.length == 6) {
    developmentDatabase.postgres.user = match[1];
    developmentDatabase.postgres.password = match[2];
    developmentDatabase.postgres.host = match[3];
    developmentDatabase.postgres.port = Number(match[4]);
    developmentDatabase.postgres.database = match[5];
    developmentDatabase.postgres.ssl = developmentDatabase.postgres.ssl = { rejectUnauthorized: false };
    return developmentDatabase;
    }
    }
    console.log("connectionString cannot be parsed");
    return null;
    }
    module.exports = {
    hostname: "http://localhost",
    port: 5656,
    database: {
    postgres: developmentDatabase.postgres
    }
    }