import * as fs from 'fs';
import * as path from 'path';
import * as Sequelize from 'sequelize';
import Link from './link';

const config = require('../../config').database;
const sequelize = new Sequelize(config.database, config.username, config.password, config);

const link = Link(sequelize);

const db = {link};

Object.keys(db).forEach((modelName) => (db as any)[modelName].associate && (db as any)[modelName].associate(db));

export default db;
