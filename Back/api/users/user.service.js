const pool = require("../../config/database");

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into registration(email,password,userName,firstName,lastName)
        values(?,?,?,?,?)`,
            [
                data.email,
                data.password,
                data.userName,
                data.firstName,
                data.lastName
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getUserByUserEmail: (email, callBack) => {
        pool.query(
            `select * from registration where email = ?`,
            [email],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    getProfile: (data, callBack) => {
        pool.query(
            `select * from registration where id=?,userName=?,firstName=?,lastName=?`,
            [
                data.id,
                data.userName,
                data.firstName,
                data.lastName
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    getUserByUserId: (id, callBack) => {
        pool.query(
            `select id,email,password,userName,firstName,lastName from registration where id=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    getUsers: callBack => {
        pool.query(
            `select id,email,password,userName,firstName,lastName from registration`,
            [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateUser: (data, callBack) => {
        pool.query(
            `update registration set email=?,password=?,userName=?,firstName=?,lastName=? where id=?`,
            [
                data.email,
                data.password,
                data.userName,
                data.firstName,
                data.lastName,
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
    deleteUser: (data, callBack) => {
        console.log("id", data.id)
        pool.query(
            ` delete from registration where id=?`,
            [data.id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    }
};