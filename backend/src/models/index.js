const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

// =================== 用户 ===================
const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  openid: { type: DataTypes.STRING(64), unique: true }, // 微信 openid
  role: { type: DataTypes.ENUM('student', 'parent', 'teacher', 'admin'), defaultValue: 'student' },
  nickname: { type: DataTypes.STRING(50) },
  avatar: { type: DataTypes.STRING(255) },
  phone: { type: DataTypes.STRING(20) },
  grade: { type: DataTypes.STRING(20) }, // 高一/高二/高三
  bio: { type: DataTypes.STRING(500) },
  // 教师专用
  teacherTitle: { type: DataTypes.STRING(50) },        // 职称
  teachingYears: { type: DataTypes.INTEGER },          // 教龄
  rating: { type: DataTypes.DECIMAL(3, 1), defaultValue: 5.0 },
  verified: { type: DataTypes.BOOLEAN, defaultValue: false },
  // 财务
  walletCommission: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  inviteCode: { type: DataTypes.STRING(16) },
  invitedBy: { type: DataTypes.INTEGER }
}, { tableName: 'users' });

// =================== 课程 ===================
const Course = sequelize.define('Course', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  teacherId: { type: DataTypes.INTEGER, allowNull: false },
  title: { type: DataTypes.STRING(100), allowNull: false },
  cover: { type: DataTypes.STRING(255) },
  grade: { type: DataTypes.ENUM('high1', 'high2', 'high3'), allowNull: false },
  subject: { type: DataTypes.ENUM('chinese','math','english','physics','chemistry','biology','politics','history','geography'), allowNull: false },
  intro: { type: DataTypes.TEXT },         // 内容简介
  highlights: { type: DataTypes.TEXT },     // 课程亮点
  pricePerSession: { type: DataTypes.DECIMAL(10, 2), allowNull: false }, // 单节价（默认 60min）
  status: { type: DataTypes.ENUM('draft','online','offline'), defaultValue: 'online' },
  salesCount: { type: DataTypes.INTEGER, defaultValue: 0 },
  ratingAvg: { type: DataTypes.DECIMAL(3, 1), defaultValue: 5.0 }
}, { tableName: 'courses' });

// =================== 课包 ===================
const Package = sequelize.define('Package', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  courseId: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING(50), allowNull: false }, // 单节 / 10节课包...
  sessionCount: { type: DataTypes.INTEGER, allowNull: false }, // 1/10/15/20
  durationMin: { type: DataTypes.INTEGER, defaultValue: 60 }, // 40/60/90
  totalPrice: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  validDays: { type: DataTypes.INTEGER, defaultValue: 90 }
}, { tableName: 'packages' });

// =================== 订单 ===================
const Order = sequelize.define('Order', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  orderNo: { type: DataTypes.STRING(40), unique: true, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  courseId: { type: DataTypes.INTEGER, allowNull: false },
  packageId: { type: DataTypes.INTEGER, allowNull: false },
  totalAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  couponDiscount: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  commissionDeduct: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  payAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  status: { type: DataTypes.ENUM('pending','paid','refunding','refunded','closed'), defaultValue: 'pending' },
  paidAt: { type: DataTypes.DATE },
  // 课时
  remainSessions: { type: DataTypes.INTEGER, defaultValue: 0 } // 剩余可预约课时
}, { tableName: 'orders' });

// =================== 预约 ===================
const Booking = sequelize.define('Booking', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  orderId: { type: DataTypes.INTEGER, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  teacherId: { type: DataTypes.INTEGER, allowNull: false },
  courseId: { type: DataTypes.INTEGER, allowNull: false },
  startAt: { type: DataTypes.DATE, allowNull: false },
  durationMin: { type: DataTypes.INTEGER, defaultValue: 60 },
  sessionIndex: { type: DataTypes.INTEGER, defaultValue: 1 }, // 第几节
  status: { type: DataTypes.ENUM('booked','ongoing','finished','cancelled'), defaultValue: 'booked' }
}, { tableName: 'bookings' });

// =================== 会议（腾讯会议）===================
const Meeting = sequelize.define('Meeting', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  bookingId: { type: DataTypes.INTEGER, allowNull: false, unique: true },
  meetingNo: { type: DataTypes.STRING(40) },     // 腾讯会议号
  meetingId: { type: DataTypes.STRING(64) },     // 腾讯返回会议 ID
  password: { type: DataTypes.STRING(32) },
  joinUrl: { type: DataTypes.STRING(500) },
  hostUrl: { type: DataTypes.STRING(500) },
  startTime: { type: DataTypes.DATE },
  endTime: { type: DataTypes.DATE },
  features: { type: DataTypes.JSON },             // {camera, whiteboard, screenShare, courseware, record}
  status: { type: DataTypes.ENUM('scheduled','ongoing','ended'), defaultValue: 'scheduled' }
}, { tableName: 'meetings' });

// =================== 课件 ===================
const Courseware = sequelize.define('Courseware', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  courseId: { type: DataTypes.INTEGER, allowNull: false },
  teacherId: { type: DataTypes.INTEGER, allowNull: false },
  title: { type: DataTypes.STRING(100), allowNull: false },
  fileUrl: { type: DataTypes.STRING(500) },
  fileType: { type: DataTypes.ENUM('pdf','ppt','video','image') },
  pageCount: { type: DataTypes.INTEGER, defaultValue: 0 }
}, { tableName: 'coursewares' });

// =================== 题目 + 答题 ===================
const Question = sequelize.define('Question', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  courseId: { type: DataTypes.INTEGER },
  teacherId: { type: DataTypes.INTEGER },
  type: { type: DataTypes.ENUM('single','multi','judge','blank','subjective'), defaultValue: 'single' },
  content: { type: DataTypes.TEXT, allowNull: false },
  options: { type: DataTypes.JSON },     // ['A.','B.',...]
  answer: { type: DataTypes.STRING(255) },
  analysis: { type: DataTypes.TEXT },
  score: { type: DataTypes.INTEGER, defaultValue: 5 }
}, { tableName: 'questions' });

const AnswerRecord = sequelize.define('AnswerRecord', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  questionId: { type: DataTypes.INTEGER, allowNull: false },
  answer: { type: DataTypes.STRING(255) },
  correct: { type: DataTypes.BOOLEAN },
  bookingId: { type: DataTypes.INTEGER }
}, { tableName: 'answer_records' });

// =================== 评价 ===================
const Evaluation = sequelize.define('Evaluation', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  bookingId: { type: DataTypes.INTEGER, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  teacherId: { type: DataTypes.INTEGER, allowNull: false },
  courseId: { type: DataTypes.INTEGER, allowNull: false },
  rating: { type: DataTypes.INTEGER, defaultValue: 5 },
  tags: { type: DataTypes.JSON },         // ['讲解清晰','耐心细致']
  content: { type: DataTypes.TEXT }
}, { tableName: 'evaluations' });

// =================== 优惠券 ===================
const Coupon = sequelize.define('Coupon', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(50), allowNull: false },
  type: { type: DataTypes.ENUM('cash','discount'), defaultValue: 'cash' },
  amount: { type: DataTypes.DECIMAL(10, 2) },   // 现金券面额 / 折扣率（0.85）
  threshold: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 }, // 满XX可用
  validDays: { type: DataTypes.INTEGER, defaultValue: 30 },
  source: { type: DataTypes.ENUM('register','invite','manual','share'), defaultValue: 'manual' }
}, { tableName: 'coupons' });

const UserCoupon = sequelize.define('UserCoupon', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  couponId: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.ENUM('unused','used','expired'), defaultValue: 'unused' },
  expireAt: { type: DataTypes.DATE },
  usedAt: { type: DataTypes.DATE }
}, { tableName: 'user_coupons' });

// =================== 关联 ===================
User.hasMany(Course, { foreignKey: 'teacherId', as: 'courses' });
Course.belongsTo(User, { foreignKey: 'teacherId', as: 'teacher' });
Course.hasMany(Package, { foreignKey: 'courseId', as: 'packages' });
Package.belongsTo(Course, { foreignKey: 'courseId' });
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Order.belongsTo(Course, { foreignKey: 'courseId', as: 'course' });
Order.belongsTo(Package, { foreignKey: 'packageId', as: 'package' });
Order.hasMany(Booking, { foreignKey: 'orderId' });
Booking.belongsTo(Order, { foreignKey: 'orderId' });
Booking.belongsTo(User, { foreignKey: 'userId', as: 'student' });
Booking.belongsTo(User, { foreignKey: 'teacherId', as: 'teacher' });
Booking.belongsTo(Course, { foreignKey: 'courseId', as: 'course' });
Booking.hasOne(Meeting, { foreignKey: 'bookingId' });
Meeting.belongsTo(Booking, { foreignKey: 'bookingId' });
Course.hasMany(Courseware, { foreignKey: 'courseId' });
Courseware.belongsTo(Course, { foreignKey: 'courseId' });
Course.hasMany(Question, { foreignKey: 'courseId' });
User.hasMany(AnswerRecord, { foreignKey: 'userId' });
AnswerRecord.belongsTo(Question, { foreignKey: 'questionId' });
Booking.hasOne(Evaluation, { foreignKey: 'bookingId' });
Evaluation.belongsTo(Booking, { foreignKey: 'bookingId' });
Evaluation.belongsTo(User, { foreignKey: 'userId', as: 'user' });
UserCoupon.belongsTo(Coupon, { foreignKey: 'couponId', as: 'coupon' });
UserCoupon.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  sequelize,
  User, Course, Package, Order, Booking, Meeting,
  Courseware, Question, AnswerRecord, Evaluation, Coupon, UserCoupon
};
