// const mysql = require('mysql');
const {Pool} = require('pg');
// const mysqlConfig = require('./config.js');
const psqlConfig = require('./config.js');

// const connection = mysql.createConnection(mysqlConfig);
const client = new Pool(psqlConfig);

client.connect((err) => {
  if (err) {
    console.log('Connection failed to psql server');
  } else {
    console.log('Connected to psql server');
  }
});

module.exports = client;
