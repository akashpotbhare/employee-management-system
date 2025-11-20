const roleModel = require('../model/role.model');


const RoleController = {

    assignRole: async (req, res) => {
        try {
            const { admin_id, user_id, new_role } = req.body;

            if (!admin_id || !user_id || !new_role) {
                return res.status(400).json({
                    success: false,
                    message: 'admin_id, user_id, and new_role are required.',
                });
            }
            const result = await roleModel.roleassing(admin_id, user_id, new_role);
            console.log("result", result);

            if (result?.message === 'Admin Not Found') {
                return res.status(404).json({
                    success: false,
                    message: result.message,
                });
            }
            if (result?.message === 'Only Admin can Assing role') {
                return res.status(404).json({
                    success: false,
                    message: result.message,
                });
            }
            if (result?.message === 'user not found') {
                return res.status(404).json({
                    success: false,
                    message: result.message,
                });
            }

            res.status(200).json({
                success: true,
                message: result?.message || 'Role assigned successfully.',
            });

        } catch (error) {
            console.error('Error in assignRole:', error.message);
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

}
module.exports = RoleController;