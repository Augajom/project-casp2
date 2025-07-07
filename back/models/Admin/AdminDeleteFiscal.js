const pool = require('../../config/database');

const AdminDeleteFiscal = (data, callback) => {
    const { fiscal_id } = data;
    
    const query = 'DELETE FROM fiscal_years WHERE id = ?';
    try {
        pool.query(query, [fiscal_id], (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return callback(err, null);
            }
            
            return callback(null, result);
        });
    } catch (error) {
        console.error('Try-catch error:', error);
        callback(error, null);
    }
};

module.exports = AdminDeleteFiscal;