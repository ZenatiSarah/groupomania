const {
    deletePost
} = require("./post.service");

const db = require("../../config/database");

module.exports = {
    createPost: (req, res, next) => {
        const body = req.body;
        const mysql = `INSERT INTO post SET ?`
        const model = {
            content: body.content,
            userId: body.userId,
            image: body.image ? `${req.protocol}://${req.get('host')}/images/${body.image} ` : null
        }
        db.query(mysql, model, (err, result) => {
            if (err) {
                return res.status(400).send({
                    message: "erreur post "
                })
            } else {
                return res.status(200).send({
                    message: "Post réussi !"
                })
            }
        })

    },
    getPosts: (req, res) => {
        const body = req.body;
        const mysql = `SELECT * FROM post`

        db.query(mysql, (err, result) => {
            if (err) {
                return res.status(400).send({
                    message: "Erreur : Récupération des publications ! "
                })
            } else {
                return res.status(200).send({
                    message: "Récupération des publications réussi !",
                    data: result
                })
            }
        })

    },
    getPost: (req, res) => {
        const body = req.body;
        const mysql = `SELECT id,content,image FROM post`

        const model = {
            id: body.id,
            userId: body.userId,
            content: body.content,
            image: `${req.protocol}://${req.get('host')}/images/${body.image}`,
        }
        db.query(mysql, model, (err, result) => {
            if (err) {
                return res.status(400).send({
                    message: " Récupération de la publication échoué !"
                })
            } else {
                return res.status(200).send({
                    message: "Récupération de la publication réussi !",
                    data: result[0]
                })
            }
        })

    },
    updatePost: (req, res) => {
        const mysql = `UPDATE post SET ?`
        const body = req.body;
        if (body.image) {
            const model = {
                id: body.id,
                content: body.content,
                userId: body.userId,
                image: `${req.protocol}://${req.get('host')}/images/${body.image} `
            }
            db.query(mysql, model, (err, result) => {
                if (err) {
                    console.log(err)
                    return res.status(400).send({
                        message: "Erreur : Modification de la publication ! "
                    })
                } else {
                    return res.status(200).send({
                        message: "Modification de la publication réussi !",
                        data: result[0]
                    })
                }
            })
        } else {
            const model = {
                id: body.id,
                content: body.content,
                userId: body.userId,
                image: null
            }
            db.query(mysql, model, (err, result) => {
                if (err) {
                    console.log(err)
                    return res.status(400).send({
                        message: "Erreur : Modification de la publication ! "
                    })
                } else {
                    return res.status(200).send({
                        message: "Modification de la publication réussi !",
                        data: result[0]
                    })
                }
            })
        };
    },
    deletePost: (req, res) => {
        const data = req.body;
        deletePost(data, (err, results) => {
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
}

