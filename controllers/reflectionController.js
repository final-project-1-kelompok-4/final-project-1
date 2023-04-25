const connection = require("../config")

module.exports = class {
    static async createReflection(req, res) {
        const result = await connection.query(
            `INSERT INTO "reflection" (success, low_point,take_away, "UserId") VALUES ($1, $2, $3, $4) RETURNING *`, 
            [req.body.success, req.body.low_point, req.body.take_away, req.userLogin.rows[0].id]
        )
        return res.status(200).json({
            message: "Create Success",
            data : result.rows[0]
        })
    }
    static async getReflection(req, res) {
        const result = await connection.query(
            `SELECT * FROM "reflection" WHERE "UserId" = $1`, 
            [req.userLogin.rows[0].id]
        )
        return res.status(200).json(result.rows)
    }
    static async updateReflection(req, res) {
        const result = await connection.query(
            `UPDATE "reflection" 
            SET 
              success = COALESCE($1, success), 
              low_point = COALESCE($2, low_point), 
              take_away = COALESCE($3, take_away) 
            WHERE id = $4 
            RETURNING *`, 
            [req.body.success, req.body.low_point, req.body.take_away, req.params.id]
        )
        return res.status(200).json({
            message: "Update Success",
            data : result.rows[0]})
    }
    static async deleteReflection(req, res) {
        const result = await connection.query(
            `DELETE FROM "reflection" WHERE id = $1 RETURNING *`, 
            [req.params.id]
        )
        return res.status(200).json({
            message : `Data with id ${result.rows[0].id} from user ${result.rows[0].UserId} deleted`})
    }
}