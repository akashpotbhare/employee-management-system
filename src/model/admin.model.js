const db = require('../../DBConfig/db');

const AdminModel = {
    createEmployee: async (name, email, password, role) => {
        try {
            const [rows] = await db.execute('CALL sp_insert_user(?,?,?,?)', [name, email, password, role]);
            return rows[0][0];
        } catch (error) {
            console.error('Error in createEmployee:', error.message);
            throw error;
        }
    },

    getAllEmployees: async () => {
        try {
            const [rows] = await db.execute('CALL sp_get_all_users()');
            return rows[0];
        } catch (error) {
            console.error('Error in getAllEmployees:', error.message);
            throw error;
        }
    }
};

module.exports = AdminModel;

