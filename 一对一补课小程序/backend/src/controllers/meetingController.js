const { Meeting, Booking } = require('../models');
const { ok, fail } = require('../utils/response');

// 教师创建腾讯会议
// 真实接入：调用腾讯会议 OpenAPI POST /v1/meetings 拿到 meeting_info_list
// 这里提供 mock：生成 9 位会议号 + join_url
exports.create = async (req, res) => {
  const { bookingId, subject, password, features } = req.body;
  const booking = await Booking.findByPk(bookingId);
  if (!booking) return fail(res, '预约不存在');
  if (booking.teacherId !== req.user.id) return fail(res, '无权操作', 1, 403);

  const exist = await Meeting.findOne({ where: { bookingId } });
  if (exist) return ok(res, exist);

  const meetingNo = String(Math.floor(100000000 + Math.random() * 900000000));
  const meetingId = 'm_' + Date.now();
  const endTime = new Date(new Date(booking.startAt).getTime() + booking.durationMin * 60000);

  const m = await Meeting.create({
    bookingId,
    meetingNo,
    meetingId,
    password: password || String(Math.floor(1000 + Math.random() * 9000)),
    joinUrl: `https://meeting.tencent.com/dm/${meetingNo}`,
    hostUrl: `https://meeting.tencent.com/host/${meetingNo}`,
    startTime: booking.startAt,
    endTime,
    features: features || { camera: true, whiteboard: true, screenShare: true, courseware: true, record: false },
    status: 'scheduled'
  });
  ok(res, m);
};

exports.detail = async (req, res) => {
  const m = await Meeting.findOne({ where: { bookingId: req.params.bookingId } });
  if (!m) return fail(res, '会议未创建', 1, 404);
  ok(res, m);
};

exports.updateStatus = async (req, res) => {
  const { status } = req.body;
  await Meeting.update({ status }, { where: { id: req.params.id } });
  ok(res);
};
