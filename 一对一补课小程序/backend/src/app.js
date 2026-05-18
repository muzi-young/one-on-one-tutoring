require('dotenv').config();
require('express-async-errors');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const sequelize = require('./config/db');
const routes = require('./routes');
const { fail } = require('./utils/response');
const { User } = require('./models');

const app = express();
app.use(cors({
  origin: '*', // 生产环境建议替换为前端域名
  credentials: true
}));
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));

app.get('/', (req, res) => res.json({ name: '一对一补课小程序 API', version: '0.1.0' }));
// 静态资源：课程封面、教师头像、海报背景等
app.use('/static', express.static(path.resolve(__dirname, '../public')));
app.use('/api', routes);

// 404
app.use((req, res) => fail(res, 'Not Found', 1, 404));
// error
app.use((err, req, res, next) => {
  console.error(err);
  fail(res, err.message || 'Server Error', 1, 500);
});

const PORT = process.env.PORT || 3000;

// 自动运行种子数据（仅当数据库为空时）
async function runSeedIfNeeded() {
  try {
    const count = await User.count();
    if (count === 0) {
      console.log('🌱 数据库为空，正在运行种子数据...');

      // 使用相对路径
      const HOST = `/static`;
      const cover = (subj) => `${HOST}/covers/${subj}.svg`;
      const avatar = (n) => `${HOST}/avatars/${n}.svg`;

      // 教师
      const teachers = [
        { openid:'tch_wangxue',  nickname:'王雪老师',  teacherTitle:'北师大硕士·高三数学',     teachingYears:8,  rating:4.9, avatar:avatar('t1'), bio:'专注高三数学冲刺，6 年高考阅卷经验，所带学生平均提分 35+'},
        { openid:'tch_liming',   nickname:'李明老师',  teacherTitle:'北外硕士·高考英语阅卷人', teachingYears:6,  rating:4.8, avatar:avatar('t2'), bio:'专注高考英语长难句、作文模板化训练'},
        { openid:'tch_zhanglao', nickname:'张老师',    teacherTitle:'重点中学物理教研组长',     teachingYears:12, rating:5.0, avatar:avatar('t3'), bio:'高考物理命题研究专家，擅长力学与电磁学'},
        { openid:'tch_chenwei',  nickname:'陈伟老师',  teacherTitle:'清华化工硕士',             teachingYears:5,  rating:4.7, avatar:avatar('t4'), bio:'有机化学专题，方程式快速记忆法'},
        { openid:'tch_zhaolei',  nickname:'赵雷老师',  teacherTitle:'人大文学博士',             teachingYears:9,  rating:4.9, avatar:avatar('t5'), bio:'高考语文阅读理解满分技巧，作文金句库'},
        { openid:'tch_liuyan',   nickname:'刘燕老师',  teacherTitle:'复旦生物硕士',             teachingYears:7,  rating:4.8, avatar:avatar('t6'), bio:'高考生物常考考点全梳理，遗传题目专项突破'}
      ];
      const T = {};
      for (const t of teachers) {
        const u = await User.create({ ...t, role:'teacher', verified:true, inviteCode:'T'+t.openid.slice(-4) });
        T[t.openid] = u;
      }

      // 学生
      const student = await User.create({
        openid:'stu_xm', role:'student', nickname:'小明',
        avatar: avatar('student'), grade:'高三', phone:'138****0001',
        inviteCode:'S0001', walletCommission:158
      });

      console.log('✅ 种子数据导入完成（教师 6 位，学生 1 位）');
    } else {
      console.log(`✅ 数据库已有 ${count} 条记录，跳过种子数据`);
    }
  } catch (e) {
    console.error('❌ 种子数据运行失败：', e.message);
  }
}

(async () => {
  try {
    await sequelize.authenticate();
    console.log(`✅ 数据库连接成功 (${sequelize.getDialect()})`);
    await sequelize.sync();
    console.log('✅ 数据表已同步');
    await runSeedIfNeeded();
    app.listen(PORT, () => console.log(`🚀 API 服务运行：http://localhost:${PORT}`));
  } catch (e) {
    console.error('❌ 启动失败：', e.message);
    process.exit(1);
  }
})();
