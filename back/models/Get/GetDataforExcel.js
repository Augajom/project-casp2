const db = require('../../config/database');

const getProjectDataQuery = `
    SELECT
        p.project_id,
        p.project_type,
        pd.project_data_p_1,
        pd.project_data_p_6,
        pd.project_data_p_7,
        pt.project_type_thai_name
    FROM
        projects p
    JOIN
        project_data pd ON p.project_id = pd.project_id
    JOIN
        project_types pt ON p.project_type = pt.project_type_id
    WHERE
        p.project_id = ?
`;

const getDataforExcelFunc = (data, callback) => {
    const { projectId } = data;

    if (!projectId) {
        return callback(new Error('Project ID is required'), null);
    }

    db.query(getProjectDataQuery, [projectId], (err, rows) => {
        if (err) return callback(err, null);
        if (rows.length === 0) return callback(new Error('Project not found'), null);

        const projectRow = rows[0];
        
        try {
            // Parse project name
            let projectName = 'N/A';
            if (projectRow.project_data_p_1) {
                const parsedP1 = JSON.parse(projectRow.project_data_p_1);
                projectName = parsedP1?.project_name || 'N/A';
            }

            let commonFee = 0;
if (projectRow.project_data_p_7) {
  try {
    const parsedP7 = JSON.parse(projectRow.project_data_p_7);
    commonFee = parseFloat(parsedP7.CommonFee || 0);
  } catch (e) {
    console.warn('Failed to parse project_data_p_7:', e);
  }
}

            // Parse budget data - handle both formats
            let budgetData = [];
            if (projectRow.project_data_p_6) {
                const parsedP6 = JSON.parse(projectRow.project_data_p_6);
                
                // Format 1: Teacher/Student projects (type 4)
                 if (projectRow.project_type === 4) {
                    // Handle both old array format and new object format
                    const items = Array.isArray(parsedP6) ? parsedP6 : 
                                (parsedP6.budget_items || []);
                    
                    budgetData = items.map((item, index) => {
                        const detailsParts = [
                            item.amount1 && `${item.amount1} ${item.unit1 || ''}`,
                            item.amount2 && `${item.amount2} ${item.unit2 || ''}`,
                            item.amount3 && `${item.amount3} ${item.unit3 || ''}`,
                        ].filter(Boolean);
                        
                        const listLabel = item.id === 'bg10' || item.id.startsWith('bg10-') || 
                                        item.id.startsWith('custom-budget')
                            ? `${item.label}: ${item.customText || ''}`
                            : item.label || 'ไม่มีชื่อรายการ';

                        return {
                            list: listLabel,
                            details: detailsParts.join(' × '),
                            cost: parseFloat(item.total) || 0
                        };
                    });
                } 
                // Format 2: Regular projects with multiple expense categories
                else {
                    // Process compensation data if exists
                    if (parsedP6?.compensation?.selectedCompensations) {
                        budgetData = budgetData.concat([
                            { 
                isCategory: true,
                list: 'หมวดค่าตอบแทน',
                details: '',
                cost: ''
            },

                            ...parsedP6.compensation.selectedCompensations.map(item => {
                                const detailsParts = [];
                                 let calculatedCost = 1;
                                
                                for (let i = 1; i <= 4; i++) {
                                    const unitValue = item[`unit${i}`];
                                    const unitCategory = item.categories?.[`unit${i}`];
                                    
                                    if (unitValue > 0) {
                                        detailsParts.push(`${unitValue} ${unitCategory}`);
                                        calculatedCost *= unitValue;
                                    }
                                }
                                const unit4Value = parseFloat(item.unit4) || 0;
    const totalValue = parseFloat(item.total) || 0;
                                const finalCost = unit4Value === calculatedCost ? unit4Value :
                     totalValue === calculatedCost ? totalValue :
                     calculatedCost;
                     let listText = item.name;
    if (item.note?.checked && item.note?.value) {
        listText += ` (${item.note.value})`;
    }

                                return {
                                    list: listText,
                                    details: detailsParts.join(' x '),
                                    cost: finalCost
                                    // item.unit4 || 0
                                    // parseFloat(item.unit4 || item.total || 0)
                                };
                            })
                        ]);
                    }

                    // Process food accommodation data if exists
                    if (parsedP6?.foodAccommodation?.selectedFoodAccommodation) {
                        budgetData = budgetData.concat(
                                [
            { 
                isCategory: true,
                list: 'หมวดค่าอาหารและเครื่องดื่ม และค่าที่พัก',
                details: '',
                cost: ''
            },

                            ...parsedP6.foodAccommodation.selectedFoodAccommodation.map(item => {
                                const detailsParts = [];
                                let calculatedCost = 1;
                                for (let i = 1; i <= 4; i++) {
                                    const unitValue = item[`unit${i}`];
                                    const unitCategory = item.categories?.[`unit${i}`];
                                    
                                    if (unitValue !== undefined && unitValue !== null && unitValue !== '') {
                                        detailsParts.push(`${unitValue} ${unitCategory}`);
                                        calculatedCost *= unitValue;
                                    }
                                }
                                const unit4Value = parseFloat(item.unit4) || 0;
    const totalValue = parseFloat(item.total) || 0;
                                const finalCost = unit4Value === calculatedCost ? unit4Value :
                     totalValue === calculatedCost ? totalValue :
                     calculatedCost;
                     let listText = item.name;
    if (item.note?.checked && item.note?.value) {
        listText += ` (${item.note.value})`;
    }
                                return {
                                    list: listText,
                                    details: detailsParts.join(' x '),
                                    cost: finalCost
                                };
                            })
                        ]);
                    }

                    // Process other expenses data if exists
                    if (parsedP6?.otherExpenses?.selectedOtherExpenses) {
                        budgetData = budgetData.concat(
                            [
            { 
                isCategory: true,
                list: 'หมวดค่าใช้จ่ายอื่นๆ',
                details: '',
                cost: ''
            },

                            ...parsedP6.otherExpenses.selectedOtherExpenses.map(item => {
                                const detailsParts = [];
                                let calculatedCost = 1;
                                for (let i = 1; i <= 4; i++) {
                                    const unitValue = item[`unit${i}`];
                                    const unitCategory = item.categories?.[`unit${i}`];
                                    
                                    if (unitValue !== undefined && unitValue !== null && unitValue !== '') {
                                        detailsParts.push(`${unitValue} ${unitCategory}`);
                                        calculatedCost *= unitValue;
                                    }
                                }
                                const unit4Value = parseFloat(item.unit4) || 0;
    const totalValue = parseFloat(item.total) || 0;
                                const finalCost = unit4Value === calculatedCost ? unit4Value :
                     totalValue === calculatedCost ? totalValue :
                     calculatedCost;
                     let listText = item.name;
    if (item.note?.checked && item.note?.value) {
        listText += ` (${item.note.value})`;
    }
                                return {
                                    list: listText,
                                    details: detailsParts.join(' x '),
                                    cost: finalCost
                                };
                            })
                        ]);
                    }
                }
            }

            callback(null, {
                project_id: projectId,
                project_name: projectName,
                project_type: projectRow.project_type_thai_name,
                budget_data: budgetData,
                project_type_id: projectRow.project_type, // Include the numeric type ID
                CommonFee: commonFee
            });

        } catch (parseError) {
            console.error('Data parsing error:', parseError);
            callback(parseError, null);
        }
    });
};

module.exports = getDataforExcelFunc;