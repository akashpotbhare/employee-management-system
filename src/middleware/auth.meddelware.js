const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: 'Access denied. Token missing.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ success: false, message: 'Invalid or expired token.' });
    }
};

const verifyAdmin = (req, res, next) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({
            success: false,
            message: 'Access denied. Only admins can perform this action.'
        });
    }
    next();
};

const verifyManager = (req, res, next) => {
    // console.log("User Role JWT:", req.user.role);
    // console.log('user_id JWT:', req.user.userId);
    if (req.user.role !== 'Manager') {
        return res.status(403).json({
            success: false,
            message: 'Access denied. Only Manager can perform this action.'
        });
    }
    next();
};

module.exports = { verifyToken, verifyAdmin, verifyManager };