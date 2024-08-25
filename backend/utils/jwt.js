const jwt = require('jsonwebtoken');

const generateTokenAndSetCookie = (userId,res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn:'24hr'
    })

    res.cookie("jwt", token, {
        maxAge:24*60*60*1000,
        httpOnly: true, // prevent cross site scripting attacks
        sameSite:"strict", // CSRF attacks cross-site forgery attacks
        secure: process.env.NODE_ENV !== "Development",
    })
}

module.exports = generateTokenAndSetCookie;