const db = require('../../DBConfig/db');


const model = {
    addEmployeeTeam: async (manager_id, Employee_id) => {
        try {

            const [rows] = await db.execute('CALL sp_add_employee_to_team(?,?)', [manager_id, Employee_id]);
            console.log("rows", rows);
            return rows[0][0];
        } catch (error) {
            console.error('Error in addEmployeeTeam:', error.message);
            throw error;
        }

    },

    getTeamEmployees: async (manager_id) => {
        try {
            const [rows] = await db.execute('CALL sp_GetTeamEmployees(?)', [manager_id]);

            return rows[0];
        } catch (error) {
            console.error('Error in getTeamEmployees:', error.message);
            throw error;
        }
    },

    AddEmployeeAttendance: async (employee_id, date, status) => {
        try {
            const [rows] = await db.execute('CALL sp_AddEmployeeAttendance(?,?,?)', [employee_id, date, status]);
            return rows[0][0];
        } catch (error) {
            console.error('Error in AddEmployeeAttendance:', error.message);
            throw error;
        }
    },
    ViewAttendance: async (viewer_id) => {
        try {
            const [rows] = await db.execute('CALL sp_ViewAttendance(?)', [viewer_id]);
            return rows[0];
        } catch (error) {
            console.error('Error in ViewAttendance:', error.message);
            throw error;

        }
    },

    ViewOwnAttendance: async (employee_id) => {
        try {
            const [rows] = await db.execute('CALL sp_ViewOwnAttendance(?)', [employee_id]);
            return rows[0];
        } catch (error) {
            console.error('Error in ViewOwnAttendance:', error.message);
            throw error;    
        }
    }


}

module.exports = model;