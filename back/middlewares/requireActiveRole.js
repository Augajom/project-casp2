const db = require('../config/database');

const requireActiveRole = (roleId) => {
  return (req, res, next) => {
    const userId = req.user?.user_id;

    if (!userId) {
      return res.status(498).json({ message: 'Invalid user token' });
    }

    const query = `
      SELECT * FROM user_access 
      WHERE access_user = ? 
        AND access_permission = ? 
        AND access_isActive = 1
    `;

    db.query(query, [userId, roleId], (err, results) => {
      if (err) {
        console.error('DB error:', err);
        return res.status(500).json({ message: 'Database error' });
      }

      if (results.length === 0) {
        return res.status(498).json({ message: 'Your access for this role is inactive' });
      }

      next();
    });
  };
};

module.exports = requireActiveRole;
