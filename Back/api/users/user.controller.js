const {
    create,
    getUserByUserEmail,
    getUserByUserId,
    getUsers,
    getProfile,
    updateUser,
    deleteUser,
} = require("./user.service");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection errror"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    login: (req, res) => {
        const body = req.body;
        getUserByUserEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(401).json({
                    success: 0,
                    data: "Invalid email "
                });
            }
            const result = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined;
                const jsontoken = sign({ result: results }, "qwe1234", {
                    expiresIn: "1h"
                });
                return res.status(200).json({
                    id: results.id,
                    firstName: results.firstName,
                    lastName: results.lastName,
                    userName: results.userName,
                    token: jsontoken
                });

            } else {
                return res.status(401).json({
                    success: 0,
                    data: "Invalid password"
                });
            }
        });
    },
    getProfile: (req, res) => {
        const id = req.params.id;
        getProfile(id, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(404).json({
                    success: 0,
                    message: " Record not Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getUserByUserId: (req, res) => {
        const id = req.params.id;
        getUserByUserId(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.status(401).json({
                    success: 0,
                    message: "Record not Found"
                });
            }
            results.password = undefined;
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    updateUsers: (req, res) => {
        const body = req.body;
        updateUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                message: "updated successfully",
                data: results
            });
        });
    },
    deleteUser: (req, res) => {
        console.log(req.body)
        const data = req.body;
        deleteUser(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                message: "user deleted successfully"
            });
        });
    }
};