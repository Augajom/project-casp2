const db = require('../../config/database');


const getFiscalYears = (callback) => {
  const query = `
    SELECT DISTINCT fiscal_year 
    FROM fiscal_years 
    ORDER BY fiscal_year DESC
  `;
  db.query(query, (err, results) => {
    if (err) return callback(err, null);
    callback(null, results.map(row => row.fiscal_year));
  });
};

const getDashboardSummary = (data, callback) => {
  
  const { fiscal_year } = data;
 
  // Query to fetch project types
  const getProjectTypes = `
    SELECT project_type_id as id, project_type_thai_name as name
    FROM project_types
    ORDER BY project_type_id
  `;

  // Updated query to fetch projects with fiscal year information
  const getProjects = `
    SELECT DISTINCT
      p.project_id,
      pd.project_data_p_1,
      p.project_type,
      pt.project_type_thai_name,
      pd.project_data_p_4,
      pd.project_data_p_6,
      pd.project_data_p_7,
      p.project_status,
      p.fiscal_year,
      a.affiliation_name
    FROM
      projects p
    JOIN
      project_types pt ON p.project_type = pt.project_type_id
    LEFT JOIN
      project_data pd ON p.project_id = pd.project_id
    LEFT JOIN
      affiliations a ON p.project_affiliation = a.affiliation_id
    WHERE
      p.project_status >= 4
      AND p.project_type IS NOT NULL
      ${fiscal_year ? 'AND p.fiscal_year = ?' : ''}
    ORDER BY
      pt.project_type_thai_name, a.affiliation_name
  `;

  db.query(getProjectTypes, (err, projectTypes) => {
    if (err) return callback(err, null);

    const queryParams = fiscal_year ? [fiscal_year] : [];

    db.query(getProjects, queryParams, (err2, projects) => {
      if (err2) return callback(err2, null);

      const projectTypesArray = Array.isArray(projectTypes) ? projectTypes : [];
      const projectsArray = Array.isArray(projects) ? projects : [];

      const summaryByType = {};

      // Initialize summary structure
      projectTypesArray.forEach(type => {
        summaryByType[type.id] = {
          id: type.id,
          name: type.name,
          groupedData: {},
          totalProjects: 0,
          totalBudget: 0,
          projects: [],
          fiscal_year: fiscal_year
        };
      });

      projectsArray.forEach(row => {
        const projectTypeID = row.project_type;
        const affiliationName = row.affiliation_name || 'ไม่ระบุหน่วยงาน';

        const existingProjectIndex = summaryByType[projectTypeID]?.projects?.findIndex(
        p => p.project_id === row.project_id);
          if (existingProjectIndex !== undefined && existingProjectIndex >= 0) {
        return;}

        // Parse project data
        let projectName = '';
        let projectTotalCost = 0;
        let commonFee = 0;
        let facultyManageShare = 0;
        let netIncomeAfterCost = 0;
        let operationDates = '';
        // let fiscalYear = row.fiscal_year || fiscal_year || null;

        // Parse project name from project_data_p_1
        if (row.project_data_p_1) {
          try {
            const parsedP1 = JSON.parse(row.project_data_p_1);
            projectName = parsedP1.project_name || '';
          } catch (e) {
            console.error(`Error parsing project_data_p_1 for project ${row.project_id}:`, e);
          }
        }

        // Parse budget from project_data_p_6
if (row.project_data_p_6) {
  try {
    const parsedP6 = JSON.parse(row.project_data_p_6);

    // Handle type 4 projects differently
    if (projectTypeID === 4) {
      // New format with budget_items array
      if (parsedP6.budget_items && Array.isArray(parsedP6.budget_items)) {
        projectTotalCost = parsedP6.budget_items.reduce((sum, item) => {
          return sum + (parseFloat(item.total) || 0);
        }, 0);
      } 
      // Old array format fallback
      else if (Array.isArray(parsedP6)) {
        projectTotalCost = parsedP6.reduce((sum, item) => {
          return sum + (parseFloat(item.total) || 
                 (parseFloat(item.amount1) || 0) * 
                 (parseFloat(item.amount2) || 1) * 
                 (parseFloat(item.amount3) || 1));
        }, 0);
      }
      // Net total budget fallback
      else if (parsedP6.net_total_budget) {
        projectTotalCost = parseFloat(parsedP6.net_total_budget) || 0;
      }
    } else {
      projectTotalCost = parsedP6.total || '';
    }
    
  } catch (e) {
    console.error(`Error parsing project_data_p_6 for project ${row.project_id}:`, e);
  }
}

        // Parse operation dates from project_data_p_4
        if (row.project_data_p_4) {
          try {
            const parsedP4 = JSON.parse(row.project_data_p_4);
            if (parsedP4.startDate && parsedP4.endDate) {
              operationDates = `${parsedP4.startDate} - ${parsedP4.endDate}`;
            }
          } catch (e) {
            console.error(`Error parsing project_data_p_4 for project ${row.project_id}:`, e);
          }
        }

        // Parse financial details from project_data_p_7
        if (row.project_data_p_7) {
          try {
            const parsedP7 = JSON.parse(row.project_data_p_7);
            commonFee = parseFloat(parsedP7.CommonFee || 0);
            facultyManageShare = parseFloat(parsedP7.facultyManageShare || 0);
            netIncomeAfterCost = parseFloat(parsedP7.netIncomeAfterCost || 0);
          } catch (e) {
            console.error(`Error parsing project_data_p_7 for project ${row.project_id}:`, e);
          }
        }

        // Initialize summary if not exists
        if (!summaryByType[projectTypeID]) {
          summaryByType[projectTypeID] = {
            id: projectTypeID,
            name: row.project_type_thai_name,
            groupedData: {},
            totalProjects: 0,
            totalBudget: 0,
            projects: [],
            fiscal_year: fiscal_year || null
          };
        }

        // Set fiscal year for project type if not set
        // if (!summaryByType[projectTypeID].fiscal_year && fiscalYear) {
        //   summaryByType[projectTypeID].fiscal_year = fiscalYear;
        // }

        // Initialize groupedData for affiliation if not exists
        if (!summaryByType[projectTypeID].groupedData[affiliationName]) {
          summaryByType[projectTypeID].groupedData[affiliationName] = {
            affiliation: affiliationName,
            count: 0,
            total: 0
          };
        }

        // Update counts and totals
        summaryByType[projectTypeID].groupedData[affiliationName].count++;
        summaryByType[projectTypeID].groupedData[affiliationName].total += projectTotalCost;
        summaryByType[projectTypeID].totalProjects++;
        summaryByType[projectTypeID].totalBudget += projectTotalCost;

        // Add project details
        summaryByType[projectTypeID].projects.push({
          project_id: row.project_id,
          project_name: projectName,
          affiliation_name: affiliationName,
          fiscal_year: row.fiscal_year || fiscal_year || null,
          operation_dates: operationDates,
          total_budget: projectTotalCost,
          common_fee: commonFee,
          faculty_manage_share: facultyManageShare,
          net_income_after_cost: netIncomeAfterCost
          // created_at: row.created_at,
          // updated_at: row.updated_at
        });
      });

      // Convert groupedData objects to arrays
      const finalSummary = Object.values(summaryByType).map(typeData => {
        typeData.groupedData = Object.values(typeData.groupedData);
        return typeData;
      });

      callback(null, {
        success: true,
        result: finalSummary,
        fiscal_year: fiscal_year || null
      });
    });
  });
};

module.exports = {
  getDashboardSummary,
  getFiscalYears
};
