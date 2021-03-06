const multer = require('multer');

//Dictionnaire des images
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};
//Indique où les images sont enregistrés
const fileStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, '../../images');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split('.')[0].split(' ').join('_');  //Permet de remplacer les espaces par des underscores
        const extension = MIME_TYPES[file.mimetype];
        //null pour dire qu'il n'y a pas d'erreur
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage: fileStorage }).single('image');