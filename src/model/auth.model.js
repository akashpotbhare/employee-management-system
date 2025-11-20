const db = require('../../DBConfig/db');


const AuthModel = {

    createuser: async (name, email, password, role) => {
        try {
            const [rows] = await db.execute('Call sp_insert_user(?,?,?,?)', [name, email, password, role]);

            if (rows[0]?.[0]?.message === 'User already exists') {
                throw new Error('User already exists');
            }
            console.log(rows[0][0]);
            return rows[0][0];
        } catch (error) {
            console.error('Error in createUser:', error.message);
            throw error;
        }

    },

    findUserByEmail: async (email) => {
        try {
            const [rows] = await db.execute('CALL sp_login(?)', [email]);
            return rows[0][0];
        } catch (error) {
            console.error('Error in findUserByEmail:', error.message);
            throw error;
        }
    },
}

module.exports = AuthModel;