require('dotenv').config();
require('express-async-errors');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const sequelize = require('./config/db');
const routes = require('./routes');
const { fail } = require('./utils/response');
const {
  User, Course, Package, Coupon, UserCoupon, Courseware, Question,
  Order, Booking, Meeting, Evaluation
} = require('./models');

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
      await User.create({
        openid:'stu_lihua', role:'student', nickname:'李华',
        avatar: avatar('student'), grade:'高二',
        inviteCode:'S0002', walletCommission:42, invitedBy: student.id
      });

      // 优惠券
      const [c100, c20, c30, c50] = await Promise.all([
        Coupon.create({ name:'新人专享券',     type:'cash',     amount:100, threshold:199, validDays:30, source:'register' }),
        Coupon.create({ name:'邀请有礼券',     type:'cash',     amount:20,  threshold:0,   validDays:60, source:'invite'   }),
        Coupon.create({ name:'评价奖励券',     type:'cash',     amount:30,  threshold:100, validDays:30, source:'share'    }),
        Coupon.create({ name:'课包满减券',     type:'cash',     amount:50,  threshold:500, validDays:60, source:'manual'   })
      ]);
      // 给小明发券
      for (const cp of [c100, c20, c50]) {
        await UserCoupon.create({
          userId: student.id, couponId: cp.id,
          expireAt: new Date(Date.now() + cp.validDays * 86400000)
        });
      }

      // 课程
      const courseDefs = [
        { tch:'tch_wangxue',  title:'高三数学冲刺·导数与函数专题', grade:'high3', subject:'math',      price:199, sales:1287, rating:4.9, intro:'针对高三导数考点全覆盖，配合个性化作业与错题复盘，3 周提分 20+', highlights:'1对1直播·互动白板·课件录播·错题本·灵活时长' },
        { tch:'tch_wangxue',  title:'高二数学·三角函数与解三角形', grade:'high2', subject:'math',      price:180, sales:642,  rating:4.8, intro:'三角函数定义、图像、性质、解三角形综合应用全梳理',           highlights:'1对1直播·分层练习·课后跟踪' },
        { tch:'tch_liming',   title:'高二英语·语法长难句精讲',     grade:'high2', subject:'english',   price:180, sales:856,  rating:4.8, intro:'高频长难句模板拆解 + 高考真题精讲，零基础也能听懂',             highlights:'1对1·真题精讲·定制作业·北外名师' },
        { tch:'tch_liming',   title:'高三英语·作文模板与写作训练', grade:'high3', subject:'english',   price:200, sales:483,  rating:4.7, intro:'高考作文 7 大主题模板 + 高分句型 + 每周批改',                   highlights:'1对1批改·阅卷人亲授·提分快' },
        { tch:'tch_zhanglao', title:'高三物理·力学+电磁学专题',     grade:'high3', subject:'physics',   price:220, sales:642,  rating:5.0, intro:'力学与电磁学专项突破，配合高考真题反复训练',                     highlights:'名师在职·12年经验·真题精讲' },
        { tch:'tch_chenwei',  title:'高三化学·有机化学一本通',       grade:'high3', subject:'chemistry', price:198, sales:521,  rating:4.7, intro:'有机化学方程式系统记忆法 + 综合题突破',                         highlights:'清华硕士·公式速记·定制题库' },
        { tch:'tch_zhaolei',  title:'高三语文·阅读理解满分技巧',     grade:'high3', subject:'chinese',   price:170, sales:937,  rating:4.9, intro:'记叙文/议论文/现代文/古文阅读全题型套路',                       highlights:'人大博士·名师亲授·套路化训练' },
        { tch:'tch_liuyan',   title:'高三生物·遗传题专项突破',       grade:'high3', subject:'biology',   price:180, sales:412,  rating:4.8, intro:'遗传与变异专题，配合大量真题精讲',                             highlights:'复旦硕士·真题精讲·错题归类' }
      ];

      const courses = [];
      for (const c of courseDefs) {
        const created = await Course.create({
          teacherId: T[c.tch].id, title: c.title, cover: cover(c.subject),
          grade: c.grade, subject: c.subject, intro: c.intro, highlights: c.highlights,
          pricePerSession: c.price, salesCount: c.sales, ratingAvg: c.rating, status:'online'
        });
        courses.push(created);
        // 每门课 4 个套餐
        await Package.bulkCreate([
          { courseId: created.id, name:'单节体验',  sessionCount:1,  durationMin:60, totalPrice: c.price,             validDays:30  },
          { courseId: created.id, name:'10 节课包', sessionCount:10, durationMin:60, totalPrice: +(c.price*10*0.9).toFixed(0), validDays:90  },
          { courseId: created.id, name:'15 节课包', sessionCount:15, durationMin:60, totalPrice: +(c.price*15*0.85).toFixed(0), validDays:120 },
          { courseId: created.id, name:'20 节课包', sessionCount:20, durationMin:60, totalPrice: +(c.price*20*0.8).toFixed(0),  validDays:180 }
        ]);
      }

      // 课件
      await Courseware.bulkCreate([
        { courseId: courses[0].id, teacherId: T.tch_wangxue.id, title:'导数专题 01 - 定义与几何意义', fileUrl:'https://example.com/p1.pdf', fileType:'pdf', pageCount:35 },
        { courseId: courses[0].id, teacherId: T.tch_wangxue.id, title:'导数专题 02 - 基本求导法则',   fileUrl:'https://example.com/p2.pdf', fileType:'pdf', pageCount:28 },
        { courseId: courses[0].id, teacherId: T.tch_wangxue.id, title:'导数专题 03 - 极值与最值',     fileUrl:'https://example.com/p3.pdf', fileType:'pdf', pageCount:32 },
        { courseId: courses[2].id, teacherId: T.tch_liming.id,  title:'语法长难句 01 - 三大从句',     fileUrl:'https://example.com/e1.pdf', fileType:'pdf', pageCount:24 },
        { courseId: courses[2].id, teacherId: T.tch_liming.id,  title:'语法长难句 02 - 非谓语动词',   fileUrl:'https://example.com/e2.pdf', fileType:'pdf', pageCount:30 },
        { courseId: courses[4].id, teacherId: T.tch_zhanglao.id,title:'力学专题 01 - 牛顿三大定律',   fileUrl:'https://example.com/ph1.pdf', fileType:'pdf', pageCount:40 }
      ]);

      // 题库
      await Question.bulkCreate([
        // 数学
        { courseId: courses[0].id, teacherId: T.tch_wangxue.id, type:'single',
          content:'已知 f(x)=x³-3x+1，则 f(x) 的极大值为：',
          options:['A. -1','B. 3','C. 1','D. -3'], answer:'B',
          analysis:"f'(x)=3x²-3=0 → x=±1，x=-1 时取极大 f(-1)=3", score:5 },
        { courseId: courses[0].id, teacherId: T.tch_wangxue.id, type:'single',
          content:'函数 y=sinx 在 x=π/2 处的导数值为：',
          options:['A. 0','B. 1','C. -1','D. π/2'], answer:'A',
          analysis:"y'=cosx, cos(π/2)=0", score:5 },
        { courseId: courses[0].id, teacherId: T.tch_wangxue.id, type:'judge',
          content:"判断：若 f'(x₀)=0，则 x₀ 必为极值点。",
          options:['对','错'], answer:'错',
          analysis:'需结合一阶导符号变化判断，f(x)=x³ 在 x=0 处导数为 0 但非极值', score:3 },
        { courseId: courses[0].id, teacherId: T.tch_wangxue.id, type:'single',
          content:'函数 f(x)=x³-3x² 的单调递增区间是：',
          options:['A. (-∞,0)','B. (2,+∞)','C. (-∞,0)∪(2,+∞)','D. (0,2)'], answer:'C',
          analysis:"f'(x)=3x²-6x=3x(x-2)>0 → x<0 或 x>2", score:5 },
        // 英语
        { courseId: courses[2].id, teacherId: T.tch_liming.id, type:'single',
          content:"It was not until midnight ___ they finished the work.",
          options:['A. that','B. when','C. which','D. while'], answer:'A',
          analysis:'强调句型 It was not until... that...', score:5 },
        { courseId: courses[2].id, teacherId: T.tch_liming.id, type:'single',
          content:"___ the rain, we went out for a walk.",
          options:['A. Despite','B. In spite','C. Although','D. Even'], answer:'A',
          analysis:'Despite + 名词（短语），In spite of + 名词', score:5 },
        // 物理
        { courseId: courses[4].id, teacherId: T.tch_zhanglao.id, type:'single',
          content:'一物体做匀加速直线运动，初速度 2 m/s，加速度 3 m/s²，4 秒末速度为：',
          options:['A. 12 m/s','B. 14 m/s','C. 10 m/s','D. 8 m/s'], answer:'B',
          analysis:'v=v₀+at = 2+3×4 = 14 m/s', score:5 },
        // 化学
        { courseId: courses[5].id, teacherId: T.tch_chenwei.id, type:'single',
          content:'下列属于同分异构体的是：',
          options:['A. 乙醇与甲醚','B. O₂ 与 O₃','C. ¹²C 与 ¹⁴C','D. 金刚石与石墨'], answer:'A',
          analysis:'同分异构体：分子式相同，结构不同', score:5 },
        // 语文
        { courseId: courses[6].id, teacherId: T.tch_zhaolei.id, type:'single',
          content:'下列句子没有语病的是：',
          options:['A. 通过学习，使我提高了认识','B. 我们要预防不犯错误','C. 经过努力，他考上了大学','D. 我基本上完全掌握了'], answer:'C',
          analysis:'A 缺主语 B 否定不当 D 语义重复', score:5 },
        // 生物
        { courseId: courses[7].id, teacherId: T.tch_liuyan.id, type:'single',
          content:'孟德尔豌豆杂交实验中，F₂ 代显隐性比为：',
          options:['A. 1:1','B. 3:1','C. 9:3:3:1','D. 1:2:1'], answer:'B',
          analysis:'一对相对性状的分离比为 3:1', score:5 }
      ]);

      console.log('✅ 种子数据导入完成');
      console.log(`   教师 ${teachers.length} 位 · 学生 2 位 · 课程 ${courses.length} 门 · 套餐 ${courses.length * 4} 个`);
      console.log(`   题库 10 道 · 课件 6 个 · 优惠券 4 种`);
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
