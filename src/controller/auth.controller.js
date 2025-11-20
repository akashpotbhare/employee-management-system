const AuthModel = require('../model/auth.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const AuthController = {
    registerUser: async (req, res) => {
        try {
            const { name, email, password, role } = req.body;
            // console.log("name", name);
            // console.log("email", email);
            // console.log("password", password);
            // console.log("role", role);

            if (!name || !email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Name, email, and password are required.',
                });
            }
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);


            const result = await AuthModel.createuser(
                name,
                email,
                hashedPassword,
                role || 'Employee'
            );
            console.log("result", result);
            res.status(201).json({
                success: true,
                message: result?.message || 'User registered successfully.',
                user_id: result?.user_id || null,
            });
        } catch (error) {
            console.error('Error in registerUser:', error.message);
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
    userlogin: async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Email and password are required.',
                });
            }

            const user = await AuthModel.findUserByEmail(email);

            if (!user || !user.user_id) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found or inactive.',
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid password',
                });
            }

            const token = jwt.sign(
                {
                    userId: user.user_id,
                    email: user.email,
                    role: user.role,
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '12h' }
            );


            return res.status(200).json({
                success: true,
                message: 'User login successful',
                auth_token: token,
                user: {
                    user_id: user.user_id,
                    email: user.email,
                    name: user.name,
                    role: user.role
                },
            });
        } catch (error) {
            console.error('Error in userLogin:', error.message);
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },

};

module.exports = AuthController;