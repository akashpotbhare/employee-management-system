const db = require('../../DBConfig/db');

const roleModel = {

    roleassing: async (admin_id, user_id, new_role) => {
        try {
            const [rows] = await db.execute('CALL sp_assingn_role(?,?,?)', [admin_id, user_id, new_role]);
            console.log("rows", rows);
            return rows[0][0];
        } catch (error) {
            console.error('Error in roleassing:', error.message);
            throw error;
        }
    }

}
module.exports = roleModel;