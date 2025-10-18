const jwt = require('jsonwebtoken');

// doctor authentication middleware
const authDoctor = async function (req, res, next) {
    try {

        const dtoken = req.headers['dtoken']
        if (!dtoken) {
            return res.json({success:false, message: "No token provided"})
        }

        const decoded = jwt.verify(dtoken, process.env.JWT_SECRET);
        req.docId = decoded.id

        next()

    } catch (error) {
        console.error(error)
        res.json({success: false, message: error.message})
    }
}

module.exports = authDoctor
