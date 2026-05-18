const { Evaluation, Booking, UserCoupon, Coupon, User, Question, AnswerRecord, Course } = require('../models');
const { ok, fail } = require('../utils/response');

// ============ 评价 ============
exports.evaluate = async (req, res) => {
  const { bookingId, rating, tags, content } = req.body;
  const b = await Booking.findByPk(bookingId);
  if (!b || b.userId !== req.user.id) return fail(res, '预约不存在');
  const exist = await Evaluation.findOne({ where: { bookingId } });
  if (exist) return fail(res, '已评价');
  const ev = await Evaluation.create({
    bookingId, userId: req.user.id, teacherId: b.teacherId, courseId: b.courseId,
    rating, tags, content
  });
  // 更新课程平均分（简化）
  const all = await Evaluation.findAll({ where: { courseId: b.courseId } });
  const avg = all.reduce((s, x) => s + x.rating, 0) / all.length;
  await Course.update({ ratingAvg: avg.toFixed(1) }, { where: { id: b.courseId } });
  // 评价后奖励优惠券
  const reward = await Coupon.findOne({ where: { source: 'share' } });
  if (reward) {
    await UserCoupon.create({
      userId: req.user.id, couponId: reward.id,
      expireAt: new Date(Date.now() + reward.validDays * 86400000)
    });
  }
  ok(res, ev);
};

// ============ 我的优惠券 ============
exports.myCoupons = async (req, res) => {
  const list = await UserCoupon.findAll({
    where: { userId: req.user.id },
    include: [{ model: Coupon, as: 'coupon' }],
    order: [['created_at', 'DESC']]
  });
  ok(res, list);
};

// ============ 答题 ============
exports.questionList = async (req, res) => {
  const { courseId, limit = 5 } = req.query;
  const list = await Question.findAll({ where: { courseId }, limit: Number(limit) });
  ok(res, list);
};

exports.submitAnswer = async (req, res) => {
  const { questionId, answer, bookingId } = req.body;
  const q = await Question.findByPk(questionId);
  if (!q) return fail(res, '题目不存在');
  const correct = String(q.answer).trim() === String(answer).trim();
  const rec = await AnswerRecord.create({
    userId: req.user.id, questionId, answer, correct, bookingId
  });
  ok(res, { correct, analysis: q.analysis, record: rec });
};

// ============ 海报 / 分享 ============
exports.poster = async (req, res) => {
  const { courseId } = req.query;
  const user = await User.findByPk(req.user.id);
  const course = await Course.findByPk(courseId);
  // 真实场景：服务端用 sharp/jimp 合成海报图返回 URL
  // 这里返回结构化数据，前端用 canvas 合成
  ok(res, {
    inviteCode: user.inviteCode,
    qrPath: `pages/login/index?invite=${user.inviteCode}&courseId=${courseId}`,
    user: { nickname: user.nickname, avatar: user.avatar },
    course: course ? { title: course.title, cover: course.cover, price: course.pricePerSession } : null
  });
};

// ============ 邀请佣金（绑定 + 结算示例） ============
exports.bindInvite = async (req, res) => {
  const { inviteCode } = req.body;
  const me = await User.findByPk(req.user.id);
  if (me.invitedBy) return fail(res, '已绑定邀请人');
  const inviter = await User.findOne({ where: { inviteCode } });
  if (!inviter || inviter.id === me.id) return fail(res, '邀请码无效');
  me.invitedBy = inviter.id;
  await me.save();
  // 双方发券
  const c = await Coupon.findOne({ where: { source: 'invite' } });
  if (c) {
    await UserCoupon.bulkCreate([
      { userId: me.id, couponId: c.id, expireAt: new Date(Date.now() + c.validDays * 86400000) },
      { userId: inviter.id, couponId: c.id, expireAt: new Date(Date.now() + c.validDays * 86400000) }
    ]);
  }
  ok(res);
};
