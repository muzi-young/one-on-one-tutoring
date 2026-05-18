require('dotenv').config();
require('express-async-errors');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const sequelize = require('./config/db');
const routes = require('./routes');
const { fail } = require('./utils/response');

const app = express();
app.use(cors());
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

(async () => {
  try {
    await sequelize.authenticate();
    console.log(`✅ 数据库连接成功 (${sequelize.getDialect()})`);
    await sequelize.sync();
    console.log('✅ 数据表已同步');
    app.listen(PORT, () => console.log(`🚀 API 服务运行：http://localhost:${PORT}`));
  } catch (e) {
    console.error('❌ 启动失败：', e.message);
    process.exit(1);
  }
})();
