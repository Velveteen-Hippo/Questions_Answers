// import connection to psql database
const psqlConnection = require('../Database');

const getAllQuestionsForProduct = function(productID, callback) {
  const selectAll = `SELECT * FROM questions WHERE product_id=${productID};`;

  psqlConnection.query(selectAll, function(err, results) {
    callback(err, results.rows);
  });
};

module.exports = {
  getAllQuestionsForProduct,
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
