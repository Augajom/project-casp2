const  con  = require('../../config/database')
const query_string = `
    SELECT * FROM fiscal_years
`
const AdminGetFiscal = (callback) => {
    // const { fiscal_year, start_date, end_date } = data;
    con.query(query_string, (err, results) => {
        if (err) {
            //console.log(err);
            callback(err, null);
        } else {
            callback(null, results);
        }
    })
}

module.exports = AdminGetFiscal