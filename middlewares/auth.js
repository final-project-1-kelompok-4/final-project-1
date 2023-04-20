const jwt= require('../helpers/jwt')
const connection = require("../config")

module.exports = async (req,res,next)=>{
    try {
        const payload = jwt.verifyToken(req.headers.access_token)
        
        if (!payload) {
            res.status(404).send({ message: 'user not found payload' })
        }
        const userData = await connection.query(`SELECT * FROM "user" WHERE id= '${payload.id}' AND email = '${payload.email }';
        `)

        if (!userData) {
            res.status(404).send({ message: 'user not found' })
        }
         else {
            req.userLogin = userData
  
            next()
        }
    } catch (error) {
        res.status(error?.code || 500).json(error)}
}