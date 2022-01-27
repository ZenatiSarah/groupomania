const pool = require("../../config/database");

module.exports = {

    create: (data, callBack) => {
        pool.query(
            `insert into post (content, image)
            values(?, ?)`,
            [
                data.content,
                data.image,
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getPosts: callBack => {
        pool.query(
            `select id,content, image, date from post`,
            [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getPost: (id, callBack) => {
        pool.query(
            `select id,content,image,date from post where id=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    updatePost: (data, callBack) => {
        pool.query(
            `update post set content = ?, image = ? where id=?`,
            [
                data.content,
                data.image,
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    deletePost: (data, callBack) => {
        console.log("id", data.id)
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
