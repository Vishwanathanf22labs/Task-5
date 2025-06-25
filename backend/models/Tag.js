import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Tag = sequelize.define('Tag', {
  name: { type: DataTypes.STRING, unique: true }
}, {
  timestamps: false,
  tableName: 'tags',
});

export default Tag;