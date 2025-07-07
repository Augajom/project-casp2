const pool = require('../../config/database');

const SQL = `
    INSERT INTO project_committee_comments(pcc_project_id, pcc_commitee_id, pcc_comment)
    VALUES(?,?,?)
`

const CommiteeSendComment = async (data,callback) => {
    const { pcc_project_id, pcc_commitee_id, pcc_comment } = data;
    console.log('Data received in CommiteeSendComment:', data);
    
    pool.query(SQL, [pcc_project_id, pcc_commitee_id, pcc_comment], (error, result) => {
        if (error) {
            console.error('Error executing query:', error);
            return callback(error, null);
        }
        return callback(null, result);
    });

    
}



module.exports = CommiteeSendComment;