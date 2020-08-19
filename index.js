const express =  require('express');
//onst cors = require('cors');
const app = express();
//var http = require("http");
//const dotenv  = require('dotenv');
const githubRoute  = require('./routes/github')

const PORT = process.env.PORT || 8000;

//app.use(express.json);
//midleware
app.use ('/github',githubRoute);


app.get('/', (req,res) => {
    res.status(200).json({mes: 'hello from thse server side '});
});

app.listen(PORT,()=>{
    console.log(`App is listening on PORT ${PORT} ...`)
});
