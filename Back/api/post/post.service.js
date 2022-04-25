const pool = require("../../config/database");

module.exports = {

    deletePost: (data, callBack) => {
        pool.query(
            ` delete from post where id=?`,
            [data.id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    }
}
