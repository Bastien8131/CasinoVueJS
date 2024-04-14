const express = require( 'express') ;
const cors = require('cors');
const app  = express();
const port = 3000;

const db = require('./config/db.js');
const {connection} = require('./config/db.js');

app.get('/', (req, res) => res.send( 'test')) ;
app.listen(port, ( ) => console. log( 'app running'));

connection.connect((err) => {
    if (err) {
        console.log('Error connecting to Db');
        return;
    }
    console.log('Connection established');
});