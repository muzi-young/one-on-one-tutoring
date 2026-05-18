const { verify } = require('../utils/jwt');
const { fail } = require('../utils/response');

module.exports = (roles = []) => (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.replace(/^Bearer\s+/i, '');
  if (!token) return fail(res, '未登录', 401, 401);
  try {
    const decoded = verify(token);
    req.user = decoded;
    if (roles.length && !roles.includes(decoded.role)) return fail(res, '无权限', 403, 403);
    next();
  } catch (e) {
    return fail(res, 'token 无效或已过期', 401, 401);
  }
};
