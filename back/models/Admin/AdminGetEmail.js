const con = require('../../config/database');

const getAllEmails = (callback) => {
  con.query('SELECT user_email FROM users', (err, results) => {
    if (err) return callback(err, null);

    const emails = results.map(row => row.user_email.toLowerCase());
    callback(null, emails);
  });
};

module.exports = getAllEmails;
