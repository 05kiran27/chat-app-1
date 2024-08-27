const jwt = require('jsonwebtoken');

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '2h'  
    });

    res.cookie("jwt", token, {
        maxAge: 2 * 60 * 60 * 1000,
        httpOnly: true, // prevents client-side script access
        sameSite: "strict", // CSRF protection
        secure: process.env.NODE_ENV !== "Development", // Secure flag in production
    });

    return token; // Return the token for use in JSON response
}

module.exports = generateTokenAndSetCookie;
