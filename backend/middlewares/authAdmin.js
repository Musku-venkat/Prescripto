const jwt = require('jsonwebtoken');

// admin authentication middleware
const authAdmin = async function (req, res, next) {
    try {

        const aToken = req.headers['atoken']
        if (!aToken) {
            return res.json({success:false, message: "No token provided"})
        }

        const decoded = jwt.verify(aToken, process.env.JWT_SECRET);

        // Check if the email matches admin email
        if (decoded.email !== process.env.ADMIN_EMAIL) {
          return res.json({ success: false, message: 'Not Authorized. Login Again.' });
        }

        next()

    } catch (error) {
        console.error(error)
        res.json({success: false, message: error.message})
    }
}

module.exports = { authAdmin }