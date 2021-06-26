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
        'helpfulness', answers.helpful, 'photos', answers.photos)) as answers
    FROM questions
    JOIN answers
      ON questions.id = answers.question_id
    WHERE questions.product_id=${productID}
      AND questions.reported = false
      AND answers.reported = false
    GROUP BY questions.id;`;

  psqlConnection.query(joinQAndA, function(err, results) {
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
      question_id=${questionID}
      AND
      reported = false
    GROUP BY
      answers.id;`;

  psqlConnection.query(selectAllAnswersForQuestion, function(err, results) {
    callback(err, results.rows);
  });
};

module.exports = {
  getQuestionsWithAnswersAndPhotos,
  getAllAnswersForQuestion,
};

// const getAllTransactions = function(callback) {
//   var selectAll = 'SELECT * FROM transactions;';

//   connection.query(selectAll, function(err, results) {
//     if (err) {
//       callback(err, null);
//     } else {
//       callback(null, results);
//     }
//   });
// };

// const getAllCategories = function(callback) {
//   var selectAll = 'SELECT * FROM categories;';

//   connection.query(selectAll, function(err, results) {
//     if (err) {
//       callback(err, null);
//     } else {
//       callback(null, results);
//     }
//   });
// };

// const postCategory = function(categoryName, categoryBudget, callback) {
//   var name = JSON.stringify(categoryName);

//   var addOne = `INSERT INTO categories (categoryName,
// categoryBudget) VALUES (${name}, ${categoryBudget});`;

//   connection.query(addOne, function(err, results) {
//     if (err) {
//       callback(err, null);
//     } else {
//       callback(null, results);
//     }
//   });
// };

// const updateCategoryID = function(category_id, transactionID, callback) {
//   var updateID = `UPDATE transactions SET category_id
// = ${category_id} WHERE id = ${transactionID};`;

//   connection.query(updateID, function(err, results) {
//     if (err) {
//       callback(err, null);
//     } else {
//       callback(null, results);
//     }
//   });
// };

// module.exports = {
//   getAllTransactions,
//   getAllCategories,
//   postCategory,
//   updateCategoryID
// };
