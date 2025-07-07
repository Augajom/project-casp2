const  con  = require('../../config/database')
const query_string = `
    INSERT INTO fiscal_years (fiscal_year, start_date, end_date)
  VALUES (?, ?, ?)
`
const AdminSetFiscal = (data, callback) => {
    const { fiscal_year, start_date, end_date } = data;
    con.query(query_string, [fiscal_year, start_date, end_date], (err, results) => {
        if (err) {
            //console.log(err);
            callback(err, null);
        } else {
            callback(null, results);
        }
    })
}

module.exports = AdminSetFiscal