const router = require('express').Router()  ;
const fetch = require('node-fetch');
const db = require('../db/data.js');
const mysql = require('mysql2');

router.post('/', async (req,res) => {

    const con = mysql.createConnection({
        host: 'sql12.freemysqlhosting.net',
        user: 'sql12361242',
        password: 'RIbHY9DG51',
        database: 'sql12361242'
      });
        
    let url ='https://api.github.com/users/mralexgray/repos'
    const get_data = async url => {
        try {
          const response = await fetch(url);
          const json = await response.json();
          console.log(json.length)
            for (let i of json ){
                console.log(i.id)
                                            
                con.query("INSERT INTO `github`(`id`, `NAME`, `html_url`, `description`, `created_at`, `open_issues`, `watchers`, `owner_id`, `owner_avatar_url`, `owner_html_url`, `owner_type`, `owner_site_admin`) Select  ?,?,?,?,?,?,?,?,?,?,?,? from dual WHERE NOT EXISTS ( SELECT * FROM github WHERE id = ? ) "
                ,[ String(i.id )  , String( i.name)  , String( i.html_url)  , String( i.description)  , String( i.created_at)  , String( i.open_issues)  , String( i.watchers)  , String( i.owner.id)  , String( i.owner.avatar_url)  , String( i.owner.html_url)  , String( i.owner.type)  , String( i.owner.site_admin )  , String(i.id )], (err,rows) => {
                 if(err) throw err;
                  
                    console.log('Data received from Db:');
                    console.log(rows);
                  });
            }


          res.send(json);
        } catch (error) {
          console.log(error);
        }
      };
      get_data(url);

    
});

router.get('/', async (req,res) => {

    const con = mysql.createConnection({
        host: 'sql12.freemysqlhosting.net',
        user: 'sql12361242',
        password: 'RIbHY9DG51',
        database: 'sql12361242'
      });
      
      try {
      con.query(" Select * from github  " , (err,rows) => {
       if(err) throw err;
        let obj =[]
       for (let i = 0; i< rows.length ; i++){
           obj.push({
            id : rows[i].id,
            name : rows[i].NAME,
            html_url: rows[i].html_url,
            description: rows[i].description,
            created_at: rows[i].created_at,
            open_issues: rows[i].open_issues,
            watchers: rows[i].watchers,
            owner:{
                id: rows[i].owner_id,
                avatar_url: rows[i].owner_avatar_url,
                html_url: rows[i].owner_html_url,
                type: rows[i].owner_type,
                site_admin: rows[i].owner_site_admin,
            }
        });
       }
        
          console.log(obj);
        });
    } catch (error) {
        console.log(error);
      }
    

});

router.get('/:rid', async (req,res) => {

    const con = mysql.createConnection({
        host: 'sql12.freemysqlhosting.net',
        user: 'sql12361242',
        password: 'RIbHY9DG51',
        database: 'sql12361242'
      });
    console.log(req.params.rid)
      try {
      con.query(" Select * from github where id = ? " , String(req.params.rid), (err,rows) => {
       if(err) throw err;
        
          console.log('Data received from Db:');
        let obj =   {
            id : rows[0].id,
            name : rows[0].NAME,
            html_url: rows[0].html_url,
            description: rows[0].description,
            created_at: rows[0].created_at,
            open_issues: rows[0].open_issues,
            watchers: rows[0].watchers,
            owner:{
                id: rows[0].owner_id,
                avatar_url: rows[0].owner_avatar_url,
                html_url: rows[0].owner_html_url,
                type: rows[0].owner_type,
                site_admin: rows[0].owner_site_admin,
            }
        }
        
          res.send(obj);
        });
    } catch (error) {
        console.log(error);
      }
    

});

module.exports = router;