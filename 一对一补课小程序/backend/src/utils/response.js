exports.ok = (res, data = null, msg = 'ok') => res.json({ code: 0, msg, data });
exports.fail = (res, msg = 'error', code = 1, status = 400) =>
  res.status(status).json({ code, msg, data: null });
