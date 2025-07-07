const db = require('../../config/database')
const getProjectDataAll = `
    SELECT 
        projects.project_id, 
        projects.project_type, 
        projects.project_data_ref, 
        projects.fiscal_year,
        projects.project_status,
        project_data.project_data_p_1,
        project_data.project_data_p_2,
        project_data.project_data_p_3,
        project_data.project_data_p_4,
        project_data.project_data_p_5,
        project_data.project_data_p_6,
        project_data.project_data_p_7
    FROM projects 
    INNER JOIN project_data ON project_data.project_data_id = projects.project_data_ref
    WHERE projects.project_id = ? AND projects.project_type = ?
`

const getProjectDataAllFunc = (data, callback) => {
    const { project_id, project_type } = data

    db.query(getProjectDataAll, [project_id, project_type], (err, result) => {
        if (err) {
            return callback(err, null)
        }
        callback(null, result)
    })
}

module.exports = getProjectDataAllFunc