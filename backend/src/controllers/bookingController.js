const { Booking, Order, Course, User, Meeting } = require('../models');
const { Op } = require('sequelize');
const { sequelize } = require('../models');
const { ok, fail } = require('../utils/response');

// 教师可预约时段（mock：每天 09-21 整点，过滤已被占用）
exports.teacherSlots = async (req, res) => {
  const { teacherId, date } = req.query;
  const start = new Date(date + 'T00:00:00');
  const end = new Date(date + 'T23:59:59');
  const booked = await Booking.findAll({
    where: { teacherId, startAt: { [Op.between]: [start, end] }, status: { [Op.ne]: 'cancelled' } },
    attributes: ['startAt']
  });
  const bookedHours = new Set(booked.map(b => new Date(b.startAt).getHours()));
  const slots = [];
  for (let h = 9; h <= 21; h++) {
    slots.push({ time: `${String(h).padStart(2, '0')}:00`, available: !bookedHours.has(h) });
  }
  ok(res, slots);
};

// 学生发起预约
exports.create = async (req, res) => {
  const { orderId, teacherId, startAt, durationMin = 60 } = req.body;
  const t = await sequelize.transaction();
  try {
    const order = await Order.findByPk(orderId, { transaction: t });
    if (!order || order.userId !== req.user.id) throw new Error('订单无效');
    if (order.status !== 'paid') throw new Error('订单未支付');
    if (order.remainSessions <= 0) throw new Error('课时已用完');

    // 占用检查
    const conflict = await Booking.findOne({
      where: { teacherId, startAt, status: { [Op.ne]: 'cancelled' } },
      transaction: t
    });
    if (conflict) throw new Error('该时段已被预约');

    const sessionIndex = await Booking.count({ where: { orderId }, transaction: t }) + 1;
    const booking = await Booking.create({
      orderId, userId: req.user.id, teacherId, courseId: order.courseId,
      startAt, durationMin, sessionIndex
    }, { transaction: t });

    order.remainSessions -= 1;
    await order.save({ transaction: t });

    await t.commit();
    ok(res, booking);
  } catch (e) {
    await t.rollback();
    fail(res, e.message);
  }
};

exports.mine = async (req, res) => {
  const { status } = req.query;
  const where = { userId: req.user.id };
  if (status) where.status = status;
  const list = await Booking.findAll({
    where,
    include: [
      { model: Course, as: 'course' },
      { model: User, as: 'teacher', attributes: ['id', 'nickname', 'avatar'] },
      { model: Meeting }
    ],
    order: [['start_at', 'ASC']]
  });
  ok(res, list);
};

// 教师查看自己的预约
exports.teacherBookings = async (req, res) => {
  const list = await Booking.findAll({
    where: { teacherId: req.user.id },
    include: [
      { model: User, as: 'student', attributes: ['id', 'nickname', 'avatar', 'grade'] },
      { model: Course, as: 'course' },
      { model: Meeting }
    ],
    order: [['start_at', 'ASC']]
  });
  ok(res, list);
};

exports.cancel = async (req, res) => {
  const b = await Booking.findByPk(req.params.id);
  if (!b || b.userId !== req.user.id) return fail(res, '预约不存在');
  b.status = 'cancelled';
  await b.save();
  await Order.increment('remainSessions', { by: 1, where: { id: b.orderId } });
  ok(res, b);
};
