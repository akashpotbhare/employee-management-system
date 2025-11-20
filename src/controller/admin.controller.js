const bcrypt = require('bcrypt');
const AdminModel = require('../model/admin.model');

const AdminController = {
    createEmployee: async (req, res) => {
        try {
            const { name, email, password, role } = req.body;

            if (!name || !email || !password || !role) {
                return res.status(400).json({
                    success: false,
                    message: 'name, email, password and role are required.'
                });
            }

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const result = await AdminModel.createEmployee(name, email, hashedPassword, role);

            if (result?.message === 'User already exists') {
                return res.status(409).json({
                    success: false,
                    message: result.message
                });
            }

            return res.status(201).json({
                success: true,
                message: result?.message || 'Employee created successfully.',
                user_id: result?.user_id || null
            });
        } catch (error) {
            console.error('Error in createEmployee:', error.message);
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },

    listEmployees: async (_req, res) => {
        try {
            const employees = await AdminModel.getAllEmployees();
            return res.status(200).json({
                success: true,
                message: 'Employees fetched successfully.',
                data: employees
            });
        } catch (error) {
            console.error('Error in listEmployees:', error.message);
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
};

module.exports = AdminController;

