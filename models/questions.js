// import connection to psql database
const psqlConnection = require('../Database');

const getQuestionsWithAnswersAndPhotos = function(
    productID, page, count, callback) {
  const joinQAndA =
  `SELECT
    questions.question_id,
    questions.question_body,
    questions.question_date,
    questions.asker_name,
    questions.question_helpfulness,
    questions.reported,
    COALESCE (jsonb_object_agg(answers.answer_id, json_build_object(
      'id', answers.answer_id,
      'body', answers.body,
      'date', answers.date,
      'answerer_name', answers.answerer_name,
      'helpfulness', answers.helpfulness,
      'photos', answers.photos,
      'reported', answers.reported))
      FILTER
        (WHERE answers.answer_id IS NOT NULL
          AND answers.reported = false), '[]')
      as answers
  FROM questions
  LEFT JOIN answers
    ON questions.question_id = answers.question_id
  WHERE questions.product_id=$1
    AND questions.reported = false
  GROUP BY questions.question_id
  OFFSET $2
  LIMIT $3;`;

  psqlConnection.query(
      joinQAndA,
      [productID, page, count],
      function(err, results) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, results);
        }
      });
};

const getAllAnswersForQuestion = function(questionID, page, count, callback) {
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
      answers.answer_id
    OFFSET $2
    LIMIT $3;`;

  psqlConnection.query(
      selectAllAnswersForQuestion,
      [questionID, page, count],
      function(err, results) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, results.rows);
        }
      });
};

const postQuestion = function(
    questionBody, askerName, askerEmail, productID, callback) {
  const insertQuestion =
  `INSERT INTO
    questions(
      "product_id",
      "question_body",
      "asker_name",
      "asker_email",
      "reported",
      "question_helpfulness"
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
        if (err) {
          callback(err, null);
        } else {
          callback(null, results);
        }
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
      "helpfulness"
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
        if (err) {
          callback(err, null);
        } else {
          callback(null, results);
        }
      });
};

const updateQuestionHelpfulness = function(questionID, callback) {
  const updateHelpfulness =
    `UPDATE
      questions
    SET
      question_helpfulness = question_helpfulness + 1
    WHERE
      question_id = $1;`;

  psqlConnection.query(updateHelpfulness, [questionID], function(err, results) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const updateAnswerHelpfulness = function(answerID, callback) {
  const updateHelpfulness =
    `UPDATE
      answers
    SET
      helpfulness = helpfulness + 1
    WHERE
      answer_id = $1;`;

  psqlConnection.query(updateHelpfulness, [answerID], function(err, results) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const updateQuestionReported = function(questionID, callback) {
  const updateReported =
    `UPDATE
      questions
    SET
      questions.reported = true
    WHERE
      question_id = $1;`;

  psqlConnection.query(updateReported, [questionID], function(err, results) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const updateAnswerReported = function(answerID, callback) {
  const updateReported =
    `UPDATE
      answers
    SET
      reported = true
    WHERE
      answer_id = $1;`;

  psqlConnection.query(updateReported, [answerID], function(err, results) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
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


