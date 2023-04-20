const connection = require("../config")
const jwt = require('../helpers/jwt')
const bcrypt = require('../helpers/bcrypt')

module.exports = class {
    static async register(req, res) {
        try {
            let checkUser = await connection.query(`SELECT * FROM "user" WHERE email = $1`, [req.body.email])
            
            if (checkUser.rows.length > 0) {
                res.status(400).json({
                    message: "User sudah tersedia"
                });
                return;
            }
            const hashPassword = await bcrypt.hashPassword(req.body.password)
            const result = await connection.query(
                `INSERT INTO "user" (email, password) VALUES ($1, $2) RETURNING *`, [req.body.email, hashPassword]
            )
            
            const secure = JSON.parse(JSON.stringify(result.rows[0]))
            delete secure.password

            res.status(200).json(secure)
        } catch (error) {
            console.error(error);
            res.status(500).json(error)
        }
    }

    static async login(req, res) {
        try {
            const userAccount = await connection.query(`SELECT * FROM "user" WHERE email = $1`, [req.body.email])
            if (!userAccount) {
                res.status(400).json({
                    message: "User tidak ditemukan"
                });
                return;
            }

            const isCorrect = bcrypt.comparePassword(req.body.password, userAccount.rows[0].password)

            if (!isCorrect) {
                throw {
                  code: 401,
                  message: "Password salah"
                }
              }

            const token = jwt.generateToken(userAccount.rows[0])
            res.status(200).json({
                message: "Login berhasil",
                token
            })

        } catch (error) {
            console.error(error);
            res.status(500).json(error)
        }
    }
}
