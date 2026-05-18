const { Order, Package, Course, UserCoupon, Coupon, User } = require('../models');
const { ok, fail } = require('../utils/response');
const { sequelize } = require('../models');

const genOrderNo = () => 'ORD' + Date.now() + Math.floor(Math.random() * 1000);

// 创建订单（下单）
exports.create = async (req, res) => {
  const { packageId, couponId, useCommission = 0 } = req.body;
  const pkg = await Package.findByPk(packageId, { include: [{ model: Course }] });
  if (!pkg) return fail(res, '套餐不存在');

  let total = Number(pkg.totalPrice);
  let couponDiscount = 0;
  if (couponId) {
    const uc = await UserCoupon.findOne({
      where: { id: couponId, userId: req.user.id, status: 'unused' },
      include: [{ model: Coupon, as: 'coupon' }]
    });
    if (uc && total >= Number(uc.coupon.threshold)) {
      if (uc.coupon.type === 'cash') couponDiscount = Number(uc.coupon.amount);
      else couponDiscount = total * (1 - Number(uc.coupon.amount));
    }
  }
  const user = await User.findByPk(req.user.id);
  const commission = Math.min(Number(useCommission || 0), Number(user.walletCommission));
  const pay = Math.max(0, total - couponDiscount - commission);

  const order = await Order.create({
    orderNo: genOrderNo(),
    userId: req.user.id,
    courseId: pkg.Course.id,
    packageId: pkg.id,
    totalAmount: total,
    couponDiscount,
    commissionDeduct: commission,
    payAmount: pay,
    status: 'pending',
    remainSessions: pkg.sessionCount
  });
  ok(res, order);
};

// 模拟支付成功（真实环境对接微信支付回调）
exports.pay = async (req, res) => {
  const { orderId } = req.body;
  const t = await sequelize.transaction();
  try {
    const order = await Order.findByPk(orderId, { transaction: t });
    if (!order || order.userId !== req.user.id) throw new Error('订单不存在');
    if (order.status !== 'pending') throw new Error('订单已处理');
    order.status = 'paid';
    order.paidAt = new Date();
    await order.save({ transaction: t });

    // 扣减佣金
    if (Number(order.commissionDeduct) > 0) {
      await User.decrement('walletCommission', {
        by: Number(order.commissionDeduct),
        where: { id: order.userId },
        transaction: t
      });
    }
    // 销量+1
    await Course.increment('salesCount', { by: 1, where: { id: order.courseId }, transaction: t });

    await t.commit();
    ok(res, order);
  } catch (e) {
    await t.rollback();
    fail(res, e.message);
  }
};

exports.myOrders = async (req, res) => {
  const list = await Order.findAll({
    where: { userId: req.user.id },
    include: [{ model: Course, as: 'course' }, { model: Package, as: 'package' }],
    order: [['created_at', 'DESC']]
  });
  ok(res, list);
};
