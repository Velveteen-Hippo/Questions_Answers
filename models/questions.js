// import connection to psql database
const psqlConnection = require('../Database');

// const getAllQuestionsForProduct = function(productID, callback) {
//   const selectAllQuestionsForProduct =
//     `SELECT * FROM questions WHERE product_id=${productID};`;

//   psqlConnection.query(selectAllQuestionsForProduct, function(err, results) {
//     callback(err, results.rows);
//   });
// };

const getQuestionsWithAnswersAndPhotos = function(productID, callback) {
  const joinQAndA =
    `SELECT
      questions.id,
      questions.body,
      questions.date_written,
      questions.asker_name,
      questions.helpful,
      questions.reported,
      jsonb_agg(json_build_object(
        'id', answers.id,
        'body', answers.body,
        'date', answers.date_written,
        'answerer_name', answers.answerer_name,
        'helpfulness', answers.helpful,
        'photos', answers.photos)) as answers
    FROM questions
    JOIN answers
      ON questions.id = answers.question_id
    WHERE questions.product_id=$1
      AND questions.reported = false
      AND answers.reported = false
    GROUP BY questions.id;`;

  psqlConnection.query(joinQAndA, [productID], function(err, results) {
    callback(err, results.rows);
  });
};

const getAllAnswersForQuestion = function(questionID, callback) {
  const selectAllAnswersForQuestion =
    `SELECT
      *
    FROM
      answers
    WHERE
      question_id=$1
      AND
      reported = false
    GROUP BY
      answers.id;`;

  psqlConnection.query(
      selectAllAnswersForQuestion,
      [questionID],
      function(err, results) {
        callback(err, results.rows);
      });
};

const postQuestion = function(
    questionBody, askerName, askerEmail, productID, callback) {
  const insertQuestion =
    `INSERT INTO
      questions(
        "product_id",
        "body",
        "asker_name",
        "asker_email",
        "reported",
        "helpful"
      )
    VALUES (
      $1,
      $2,
      $3,
      $4,
      'false',
      0
    );`;

  psqlConnection.query(
      insertQuestion,
      [productID, questionBody, askerName, askerEmail],
      function(err, results) {
        callback(err, results);
      });
};

const postAnswerForQuestion = function(
    questionID, answerBody, answererName, answererEmail, photos, callback) {
  const insertAnswer =
    `INSERT INTO
      answers(
        "question_id",
        "body",
        "answerer_name",
        "answerer_email",
        "photos",
        "reported",
        "helpful"
      )
    VALUES (
      $1,
      $2,
      $3,
      $4,
      $5,
      'false',
      0
    );`;

  psqlConnection.query(
      insertAnswer,
      [questionID, answerBody, answererName, answererEmail, photos],
      function(err, results) {
        callback(err, results);
      });
};

const updateQuestionHelpfulness = function(questionID, callback) {
  const updateHelpfulness =
    `UPDATE
      questions
    SET
      helpful = helpful + 1
    WHERE
      id = $1;`;

  psqlConnection.query(updateHelpfulness, [questionID], function(err, results) {
    callback(err, results);
  });
};

const updateAnswerHelpfulness = function(answerID, callback) {
  const updateHelpfulness =
    `UPDATE
      answers
    SET
      helpful = helpful + 1
    WHERE
      id = $1;`;

  psqlConnection.query(updateHelpfulness, [answerID], function(err, results) {
    callback(err, results);
  });
};

const updateQuestionReported = function(questionID, callback) {
  const updateReported =
    `UPDATE
      questions
    SET
      reported = true
    WHERE
      id = $1;`;

  psqlConnection.query(updateReported, [questionID], function(err, results) {
    callback(err, results);
  });
};

const updateAnswerReported = function(answerID, callback) {
  const updateReported =
    `UPDATE
      answers
    SET
      reported = true
    WHERE
      id = $1;`;

  psqlConnection.query(updateReported, [answerID], function(err, results) {
    callback(err, results);
  });
};

module.exports = {
  getQuestionsWithAnswersAndPhotos,
  getAllAnswersForQuestion,
  postQuestion,
  postAnswerForQuestion,
  updateQuestionHelpfulness,
  updateAnswerHelpfulness,
  updateQuestionReported,
  updateAnswerReported,
};


