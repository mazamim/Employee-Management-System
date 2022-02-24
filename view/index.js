const {cn}=require('../config/connection.js')

const view_table=(sql)=>
{
    return new Promise(function(resolve, reject) {
     

        cn.query(sql, function (err, rows) {
          
            if (err) {
                return reject(err);
            }
            resolve(rows)
          
        });
    });
}



  module.exports={view_table}