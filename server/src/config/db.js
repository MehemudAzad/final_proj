const Pool = require('pg').Pool;

const pool = new Pool({
    user : "postgres",
    password : "2105014",
    host : "localhost",
    port : 5432,
    database : "testdb"
});

module.exports = pool;


