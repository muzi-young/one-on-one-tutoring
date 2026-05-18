const { Course, Package, User, Evaluation, Courseware } = require('../models');
const { Op } = require('sequelize');
const { ok, fail } = require('../utils/response');

exports.list = async (req, res) => {
  const { grade, subject, keyword, page = 1, pageSize = 20 } = req.query;
  const where = { status: 'online' };
  if (grade) where.grade = grade;
  if (subject) where.subject = subject;
  if (keyword) where.title = { [Op.like]: `%${keyword}%` };

  const { rows, count } = await Course.findAndCountAll({
    where,
    include: [{ model: User, as: 'teacher', attributes: ['id', 'nickname', 'avatar', 'teacherTitle', 'rating'] }],
    order: [['sales_count', 'DESC']],
    offset: (page - 1) * pageSize,
    limit: Number(pageSize)
  });
  ok(res, { list: rows, total: count });
};

exports.detail = async (req, res) => {
  const course = await Course.findByPk(req.params.id, {
    include: [
      { model: User, as: 'teacher' },
      { model: Package, as: 'packages' }
    ]
  });
  if (!course) return fail(res, '课程不存在', 1, 404);

  const evaluations = await Evaluation.findAll({
    where: { courseId: course.id },
    include: [{ model: User, as: 'user', attributes: ['nickname', 'avatar'] }],
    order: [['created_at', 'DESC']],
    limit: 10
  });
  ok(res, { course, evaluations });
};

// 教师创建课程
exports.create = async (req, res) => {
  const { title, cover, grade, subject, intro, highlights, pricePerSession, packages } = req.body;
  const course = await Course.create({
    teacherId: req.user.id, title, cover, grade, subject, intro, highlights, pricePerSession
  });
  if (Array.isArray(packages)) {
    for (const p of packages) {
      await Package.create({ ...p, courseId: course.id });
    }
  }
  ok(res, course);
};

// 课件列表
exports.coursewares = async (req, res) => {
  const list = await Courseware.findAll({ where: { courseId: req.params.id } });
  ok(res, list);
};
