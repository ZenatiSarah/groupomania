const {
    create,
    getPost,
    getPosts,
    updatePost,
    deletePost
} = require("./post.service");

const fs = require('fs');
const db = require("../../config/database");
const xss = require("xss");

module.exports = {
    createPost: (req, res) => {
        const publicationObject = req.body;
        const mysql = `INSERT INTO post SET ?`
        const publication = publicationObject.image ? {
            ...publicationObject,
            content: xss(publicationObject.content),
            userId: xss(publicationObject.userId),
            image: `${req.protocol}://${req.get('host')}/images/${publicationObject.image}`
        } : {
            content: xss(publicationObject.content),
            userId: xss(publicationObject.userId),
            id: xss(publicationObject.id)
        };
        db.query(mysql, publication, (err, result) => {
            if (err) {
                return res.status(400).json({ err })
            } else {
                return res.status(201).json({ message: "objet enregistré !" })
            }
        })
    },
    getPosts: (req, res) => {
        getPosts((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getPost: (req, res) => {
        const id = req.params.id;
        getPost(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not Found"
                });
            }
            results.password = undefined;
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    updatePost: (req, res) => {
        const body = req.body;
        const mysql = `UPDATE post SET ?`

        const publicationObject = body.image ? {
            content: body.content,
            userId: body.userId,
            image: `${req.protocol}://${req.get('host')}/images/${body.image}`
        } : {
            content: body.content,
            userId: body.userId,
            id: body.id
        };

        if (body.image) {
            const image = body.image.split('/images')[1];
            fs.unlink(`images/${image}`, () => {
                db.query(mysql, { ...publicationObject, id: req.params.id }, (err, results) => {
                    if (err) {
                        return res.status(400).send({ err, message: "Erreur : Modification de la publication ! image" })
                    } else {
                        return res.status(200).send({ message: "Modification de la publication réussi !" }, results[0])
                    }
                })
            });
        } else {

            db.query(mysql, publicationObject, (err, results) => {
                if (err) {
                    return res.status(400).send({ err, message: "Erreur : Modification de la publication ! " })
                } else {
                    return res.status(200).json({ message: "Modification de la publication réussi !", data: results[0] })
                }
            })
        }
    },
    deletePost: (req, res) => {
        console.log(req.body)
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