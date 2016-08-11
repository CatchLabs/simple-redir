import * as fs from 'fs';
import * as path from 'path';
import * as Sequelize from 'sequelize';

const NODE_ENV = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '/../../config/config.json'))[NODE_ENV];
const sequelize = new Sequelize(config.database, config.username, config.password, config);

const Link = sequelize.import('./link') as Sequelize.Model<{}, {linkId: string, linkToken: string, linkUrl: string}>;

const db = {Link};

Object.keys(db).forEach((modelName) => (db as any)[modelName].associate && (db as any)[modelName].associate(db));

export default db;
