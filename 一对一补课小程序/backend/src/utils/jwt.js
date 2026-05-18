const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'dev_secret';
const EXPIRES = process.env.JWT_EXPIRES_IN || '7d';

exports.sign = (payload) => jwt.sign(payload, SECRET, { expiresIn: EXPIRES });
exports.verify = (token) => jwt.verify(token, SECRET);
