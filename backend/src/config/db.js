require('dotenv').config();
const { Sequelize } = require('sequelize');
const path = require('path');

const DB_DIALECT = process.env.DB_DIALECT || 'sqlite';

let sequelize;
if (DB_DIALECT === 'sqlite') {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '../../', process.env.DB_STORAGE || 'db.sqlite'),
    logging: false,
    define: { underscored: true, timestamps: true }
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME || 'tutoring',
    process.env.DB_USER || 'root',
    process.env.DB_PASS || 'root',
    {
      host: process.env.DB_HOST || '127.0.0.1',
      port: Number(process.env.DB_PORT || 3306),
      dialect: 'mysql',
      logging: false,
      define: { underscored: true, timestamps: true },
      pool: { max: 10, min: 0, acquire: 30000, idle: 10000 }
    }
  );
}

module.exports = sequelize;
