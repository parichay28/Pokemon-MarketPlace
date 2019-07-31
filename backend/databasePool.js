const  {Pool}  = require('pg');
const databaseConfig = require('./secrets/databaseConfig.js');

const pool = new Pool(databaseConfig);

module.exports = pool;



/*
//CHECKING FOR A SUCCESSFUL CONNECTION

pool.query('SELECT * FROM generation', (err, res)=> {
    if(err) return console.log('error', err);

    console.log('res.rows', res.rows);
});

*/
