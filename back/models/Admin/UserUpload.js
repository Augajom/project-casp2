const db = require('../../config/database')

const insertUser = (user, callback) => {
  const query = `
    INSERT INTO users (user_email, user_employeeID, user_name, user_affiliation)
    VALUES (?, ?, ?, ?)
  `
  const params = [
    user.user_email,
    user.user_employeeID,
    user.user_name,
    user.user_affiliation
  ]

  db.query(query, params, (err, result) => {
    if (err) return callback(err, null)
    callback(null, result)
  })
}

function insertUserAccess(accessData, callback) {
  const sql = 'INSERT INTO user_access SET ?'
  db.query(sql, accessData, callback)
}

module.exports = {
  insertUser,
  insertUserAccess
}