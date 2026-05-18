const { User, Coupon, UserCoupon } = require('../models');
const { sign } = require('../utils/jwt');
const { ok, fail } = require('../utils/response');
const { v4: uuidv4 } = require('uuid');

// 微信登录 / 开发模式登录
// 真实场景：前端 wx.login -> code -> 后端 code2session 拿 openid
// 本骨架支持 mock：传 mockOpenid 即可
exports.login = async (req, res) => {
  const { code, mockOpenid, role = 'student', nickname, avatar } = req.body;

  let openid = mockOpenid;
  if (!openid && code) {
    // TODO: 接入真实 wx.code2session
    // const r = await fetch(`https://api.weixin.qq.com/sns/jscode2session?appid=${WX_APPID}&secret=${WX_SECRET}&js_code=${code}&grant_type=authorization_code`);
    openid = 'wx_' + code.slice(0, 16);
  }
  if (!openid) return fail(res, '缺少 code 或 mockOpenid');

  let user = await User.findOne({ where: { openid } });
  let isNew = false;
  if (!user) {
    isNew = true;
    user = await User.create({
      openid, role, nickname: nickname || '同学' + Math.floor(Math.random() * 1000),
      avatar, inviteCode: uuidv4().slice(0, 8)
    });
    // 新用户赠送优惠券
    const welcome = await Coupon.findOne({ where: { source: 'register' } });
    if (welcome) {
      await UserCoupon.create({
        userId: user.id, couponId: welcome.id,
        expireAt: new Date(Date.now() + welcome.validDays * 86400000)
      });
    }
  }

  const token = sign({ id: user.id, role: user.role, openid: user.openid });
  return ok(res, { token, user, isNew });
};

exports.me = async (req, res) => {
  const u = await User.findByPk(req.user.id);
  ok(res, u);
};

exports.updateProfile = async (req, res) => {
  const { nickname, avatar, phone, grade, bio } = req.body;
  await User.update({ nickname, avatar, phone, grade, bio }, { where: { id: req.user.id } });
  const u = await User.findByPk(req.user.id);
  ok(res, u);
};
