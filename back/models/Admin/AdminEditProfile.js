const con = require('../../config/database');

const profileUpdate = `
    UPDATE users
    SET user_email = ?, 
        user_employeeID = ?, 
        user_name = ?, 
        user_affiliation = ?
    WHERE user_id = ?
`;

const editProfile = (data, callback) => {
    const { user_email, user_employeeID, user_name, user_affiliation, user_id } = data;

    con.query(profileUpdate, [user_email, user_employeeID, user_name, user_affiliation, user_id], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, result);
    });
};

module.exports = editProfile;
