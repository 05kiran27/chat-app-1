const jwt = require('jsonwebtoken')
const User = require('../models/userModel');

exports.protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1] || req.body.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Please login, no token provided",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found in protectRoute',
            });
        }

        req.user = user;
        console.log('Protect route middleware executed successfully');
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in protectRoute middleware",
        });
    }
}
