const router = require('express').Router();
const auth = require('../middlewares/auth');
const A = require('../controllers/authController');
const C = require('../controllers/courseController');
const O = require('../controllers/orderController');
const B = require('../controllers/bookingController');
const M = require('../controllers/meetingController');
const E = require('../controllers/extraController');

// ===== 鉴权 =====
router.post('/auth/login', A.login);
router.get('/auth/me', auth(), A.me);
router.put('/auth/profile', auth(), A.updateProfile);

// ===== 课程 =====
router.get('/courses', C.list);
router.get('/courses/:id', C.detail);
router.get('/courses/:id/coursewares', C.coursewares);
router.post('/courses', auth(['teacher']), C.create);

// ===== 订单 =====
router.post('/orders', auth(), O.create);
router.post('/orders/pay', auth(), O.pay);
router.get('/orders/mine', auth(), O.myOrders);

// ===== 预约 =====
router.get('/bookings/slots', B.teacherSlots);
router.post('/bookings', auth(), B.create);
router.get('/bookings/mine', auth(), B.mine);
router.get('/bookings/teacher', auth(['teacher']), B.teacherBookings);
router.post('/bookings/:id/cancel', auth(), B.cancel);

// ===== 会议 =====
router.post('/meetings', auth(['teacher']), M.create);
router.get('/meetings/booking/:bookingId', auth(), M.detail);
router.put('/meetings/:id/status', auth(['teacher']), M.updateStatus);

// ===== 评价 / 优惠券 / 答题 / 海报 =====
router.post('/evaluations', auth(), E.evaluate);
router.get('/coupons/mine', auth(), E.myCoupons);
router.get('/questions', E.questionList);
router.post('/answers', auth(), E.submitAnswer);
router.get('/poster', auth(), E.poster);
router.post('/invite/bind', auth(), E.bindInvite);

module.exports = router;
