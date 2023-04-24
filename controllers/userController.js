
const bcrypt = require('../helpers/bcrypt');
const jwt = require('../helpers/jwt');
const { pool } = require('../config/index');


const userController = {};


userController.register = async (req, res) => {
  try {
    
    const { email, password } = req.body;
    const result = await pool.query('SELECT * FROM user WHERE email = $1', [email]);
    const user = result.rows[0];
    if (user) {
      return res.status(400).json({ message: 'Email already taken' });
    }
    await pool.query('INSERT INTO user (email, password) VALUES ($1, $2)', [email, hashedPassword]);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


userController.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query('SELECT * FROM user WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = userController;
