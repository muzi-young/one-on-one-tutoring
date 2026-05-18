import { get, post, put } from './request';

export const api = {
  // 鉴权
  login: (body) => post('/auth/login', body),
  me: () => get('/auth/me'),
  updateProfile: (body) => put('/auth/profile', body),

  // 课程
  courseList: (params) => get('/courses', params),
  courseDetail: (id) => get(`/courses/${id}`),
  coursewares: (id) => get(`/courses/${id}/coursewares`),
  createCourse: (body) => post('/courses', body),

  // 订单
  createOrder: (body) => post('/orders', body),
  payOrder: (body) => post('/orders/pay', body),
  myOrders: () => get('/orders/mine'),

  // 预约
  teacherSlots: (params) => get('/bookings/slots', params),
  createBooking: (body) => post('/bookings', body),
  myBookings: (params) => get('/bookings/mine', params),
  teacherBookings: () => get('/bookings/teacher'),
  cancelBooking: (id) => post(`/bookings/${id}/cancel`),

  // 会议
  createMeeting: (body) => post('/meetings', body),
  meetingByBooking: (bookingId) => get(`/meetings/booking/${bookingId}`),

  // 其他
  evaluate: (body) => post('/evaluations', body),
  myCoupons: () => get('/coupons/mine'),
  questions: (params) => get('/questions', params),
  submitAnswer: (body) => post('/answers', body),
  poster: (params) => get('/poster', params),
  bindInvite: (body) => post('/invite/bind', body)
};
