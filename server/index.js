// const express = require('express');
const express = require('express');
// const db = require('../database-mysql');
const questions = require('../models/questions.js');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/qa/questions/:id', (req, res) => {
  const productID = req.params.id;

  questions.getQuestionsWithAnswersAndPhotos(productID, function(err, results) {
    if (err) {
      res.status(400).send(
          'Error getting all questions, answers, photos for product',
      );
    } else {
      res.status(200).send(results);
    }
  });
});

app.get('/qa/questions/:question_id/answers', (req, res) => {
  const questionID = req.params.question_id;

  questions.getAllAnswersForQuestion(questionID, function(err, results) {
    if (err) {
      res.status(400).send('Error getting all answers for question');
    } else {
      res.status(200).send(results);
    }
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});


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
