// const express = require('express');
const express = require('express');
// const db = require('../database-mysql');
const questions = require('../models/questions.js');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/qa/questions', (req, res) => {
  const productID = req.query.product_id;
  let page;
  let count;
  if (req.query.count) {
    count = req.query.count;
  } else {
    count = 5;
  }

  if (req.query.page) {
    page = (req.query.page - 1) * count;
  } else {
    page = 0;
  }

  questions.getQuestionsWithAnswersAndPhotos(
      productID,
      page,
      count,
      function(err, results) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(200).send({product_id: productID, results: results.rows});
        }
      });
});

app.get('/qa/questions/:question_id/answers', (req, res) => {
  const questionID = req.params.question_id;
  let page;
  let count;
  if (req.query.count) {
    count = req.query.count;
  } else {
    count = 5;
  }

  if (req.query.page) {
    page = (req.query.page - 1) * count;
  } else {
    page = 0;
  }

  questions.getAllAnswersForQuestion(
      questionID,
      page,
      count,
      function(err, results) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(200).send(
              {question: questionID,
                page: page,
                count: count,
                results: results,
              },
          );
        }
      });
});

app.post('/qa/questions', (req, res) => {
  const questionBody = req.body.body;
  const askerName = req.body.name;
  const askerEmail = req.body.email;
  const productID = req.body.product_id;

  questions.postQuestion(
      questionBody, askerName, askerEmail, productID,
      function(err, results) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(201).send('Question created! :)');
        }
      });
});

app.post('/qa/questions/:question_id/answers', (req, res) => {
  const questionID = req.params.question_id;
  const answerBody = req.body.body;
  const answererName = req.body.name;
  const answererEmail = req.body.email;
  const photos = req.body.photos;

  questions.postAnswerForQuestion(
      questionID, answerBody, answererName, answererEmail, photos,
      function(err, results) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(201).send('Answer created! :)');
        }
      });
});

app.put('/qa/questions/:question_id/helpful', (req, res) => {
  const questionID = req.params.question_id;

  questions.updateQuestionHelpfulness(
      questionID,
      function(err, results) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(204).send('Success updating question helpfulness! :)');
        }
      });
});

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  const answerID = req.params.answer_id;

  questions.updateAnswerHelpfulness(
      answerID,
      function(err, results) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(204).send('Success updating answer helpfulness! :)');
        }
      });
});

app.put('/qa/questions/:question_id/report', (req, res) => {
  const questionID = req.params.question_id;

  questions.updateQuestionReported(
      questionID,
      function(err, results) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(204).send('Success changing question to be reported! :)');
        }
      });
});

app.put('/qa/answers/:answer_id/report', (req, res) => {
  const answerID = req.params.answer_id;

  questions.updateAnswerReported(
      answerID,
      function(err, results) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(204).send('Success changing answer to be reported! :)');
        }
      });
});


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});


