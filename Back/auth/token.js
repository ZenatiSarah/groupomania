const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    let token = req.headers["authorization"];
    console.log(token)


    try {
        // Remove Bearer from string
        token = token.slice(7);
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                return res.json({
                    success: 0,
                    message: "Invalid Token..."
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifié' });
        console.log(error)
    }

};