const pool = require('../config/database');

function getProjectNameAndUserEmail(project_id, callback) {
  const sql = `
    SELECT 
      JSON_UNQUOTE(JSON_EXTRACT(p.project_data_p_1, '$.project_name')) AS project_name,
      u.user_email
    FROM project_data p
    JOIN projects pr ON pr.project_id = p.project_id
    JOIN users u ON u.user_id = pr.project_user
    WHERE p.project_id = ?
    LIMIT 1
  `;

  pool.query(sql, [project_id], (err, results) => {
    if (err) {
      return callback(err);
    }
    if (results.length === 0) {
      return callback(null, null);
    }
    callback(null, results[0]);
  });
}

module.exports = {
  getProjectNameAndUserEmail,
};
