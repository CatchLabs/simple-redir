import * as fs from 'fs';
import * as path from 'path';
import * as Sequelize from 'sequelize';

const NODE_ENV = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '/../../config/config.json'))[NODE_ENV];
const sequelize = new Sequelize(config.database, config.username, config.password, config);

const Link = sequelize.import('./link');

const db: {[key: string]: Sequelize.Model<{}, {}> & {associate?: any}} = {Link};

Object.keys(db).forEach((modelName) => db[modelName].associate && db[modelName].associate(db));

export default db;
