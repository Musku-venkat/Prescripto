const jwt = require('jsonwebtoken');

// user authentication middleware
const authUser = async function (req, res, next) {
    try {

        const token = req.headers.token
        if (!token) {
            return res.json({success:false, message: "No token provided"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id

        next()

    } catch (error) {
        console.error(error)
        res.json({success: false, message: error.message})
    }
}

module.exports = authUser