const mysql = require('mysql2');

const pool = mysql.createPool  ({
    connectionLimit: 100,
    password : 'password',
    user : 'user',
    database : 'db',
    host : 'localhost',
    port : '3300'
})

let githubdb = {};

githubdb.all =() => {

    return new Promise((resolve,reject ) =>{
        pool.query(`Select * from github ` ,(err,results)=>{
            if(err) {
                return reject(pool);
            }
            return resolve(results);
        });
    });
}

module.exports = githubdb ;