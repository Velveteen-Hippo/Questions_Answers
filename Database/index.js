// const mysql = require('mysql');
const {Client} = require('pg');
// const mysqlConfig = require('./config.js');
const psqlConfig = require('./config.js');

// const connection = mysql.createConnection(mysqlConfig);
const client = new Client(psqlConfig);

client.connect((err) => {
  if (err) {
    console.log('Connection failed to psql server');
  } else {
    console.log('Connected to psql server');
  }
});

module.exports = client;
