const db = require('../../config/database');

const createProject = `INSERT INTO projects (project_type, project_user, project_affiliation) VALUES (?, ?, ?)`;
const insertProjectData = `INSERT INTO project_data (project_id, project_data_p_6) VALUES (?, ?)`;
const updateProjectRef = `UPDATE projects SET project_data_ref = ? WHERE project_id = ?`;
const updateProjectData = `UPDATE project_data SET project_data_p_6 = ? WHERE project_id = ?`;

const Save_TS_P6 = (data, callback) => {
    const { project_id, project_type, project_data, project_user, project_affiliation } = data;
    
    try {
        // Parse the incoming data
        let parsedData;
        try {
            parsedData = JSON.parse(project_data);
        } catch (e) {
            return callback(new Error('Invalid JSON data'), null);
        }

        // Transform data for type 4 (Teacher/Student)
        let dataToSave = project_data;
        // In the Save_TS_P6.js file, modify the data transformation part for project_type 4
if (project_type === 4) {
    // Always save with the same structure
    dataToSave = JSON.stringify({
        budget_items: parsedData.map(item => ({
            id: item.id || `item-${Math.random().toString(36).substr(2, 9)}`,
            label: item.label || 'ไม่มีชื่อรายการ',
            amount1: item.amount1 || 0,
            amount2: item.amount2 || 0,
            amount3: item.amount3 || 0,
            total: item.total || 0,
            unit1: item.unit1 || '',
            unit2: item.unit2 || '',
            unit3: item.unit3 || '',
            info: item.info || '',
            customText: item.customText || '',
            checked: item.checked !== false // default to true if not specified
        })),
        net_total_budget: parsedData.reduce((sum, item) => sum + (item.total || 0), 0)
    });
}

        if (!project_id) {
            // Create new project
            db.query(createProject, [project_type, project_user, project_affiliation], (err, result) => {
                if (err) return callback(err, null);

                const newProjectId = result.insertId;
                
                db.query(insertProjectData, [newProjectId, dataToSave], (err, result1) => {
                    if (err) return callback(err, null);

                    const newProjectDataId = result1.insertId;
                    
                    db.query(updateProjectRef, [newProjectDataId, newProjectId], (err) => {
                        if (err) return callback(err, null);
                        
                        callback(null, { 
                            success: true, 
                            message: 'Project created successfully',
                            project_id: newProjectId,
                            project_data: JSON.parse(dataToSave) // Return parsed data for verification
                        });
                    });
                });
            });
        } else {
            // Update existing project
            db.query(updateProjectData, [dataToSave, project_id], (err, result) => {
                if (err) return callback(err, null);
                
                callback(null, { 
                    success: true, 
                    message: 'Project updated successfully',
                    project_id: project_id,
                    project_data: JSON.parse(dataToSave) // Return parsed data for verification
                });
            });
        }
    } catch (error) {
        console.error('Unexpected error in Save_TS_P6:', error);
        callback(error, null);
    }
};

module.exports = Save_TS_P6;