const express = require('express');
const questions = require('../models/questions.js');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/qa/questions/:id', (req, res) => {
  console.log('req inside qa/questions/:id route', req.params);
  const productID = req.params.id;

  questions.getAllQuestionsForProduct(productID, function(err, results) {
    if (err) {
      res.status(400).send('Error getting all transactions');
    } else {
      res.status(200).send(results);
    }
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

// const express = require('express');
// const db = require('../database-mysql');

// const app = express();
// const PORT = 8080;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(express.static(__dirname + '/../client/dist'));

// app.get('/api/transactions', (req, res) => {
//   db.getAllTransactions(function(err, results) {
//     if (err) {
//       res.send('Error getting all transactions');
//     } else {
//       res.send(results);
//     }
//   });
// });

// app.get('/api/categories', (req, res) => {
//   db.getAllCategories(function(err, results) {
//     if (err) {
//       res.send('Error getting all categories');
//     } else {
//       res.send(results);
//     }
//   });
// });

// app.post('/api/categories', (req, res) => {
//   var categoryName = req.body.name;
//   var categoryBudget = req.body.budget;

//   db.postCategory(categoryName, categoryBudget, function(err, results) {
//     if (err) {
//       console.log('Error posting category');
//       res.send('Error posting category');
//     } else {
//       console.log('Success posting category');
//       res.send('Success posting category');
//     }
//   });
// });

// app.put('/api/transactions', (req, res) => {
//   var category_id = req.body.category_id;
//   var transactionID = req.body.id;

//   db.updateCategoryID(category_id, transactionID, function(err, results) {
//     if (err) {
//       console.log('Error updating category for this transaction');
//       res.send('Error updating category for this transaction');
//     } else {
//       console.log('Success updating category for this transaction');
//       res.send('Success updating category for this transaction');
//     }
//   });
// });

// app.listen(PORT, () => {
//   console.log(`listening on port ${PORT}`);
// });
