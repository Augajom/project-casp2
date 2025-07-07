const pool = require('../../config/database');

const SQL = `
    SELECT project_committee_comments.pcc_comment,
           project_committee_comments.created_at
    FROM project_committee_comments
    WHERE project_committee_comments.pcc_project_id = ?
    AND project_committee_comments.pcc_commitee_id = ?
`

const CommiteeGetComment = async (data,callback) => {
    const { pcc_project_id, pcc_commitee_id } = data;
    
    pool.query(SQL, [pcc_project_id, pcc_commitee_id], (error, result) => {
        if (error) {
            console.error('Error executing query:', error);
            return callback(error, null);
        }
        return callback(null, result);
    });

    
}



module.exports = CommiteeGetComment;