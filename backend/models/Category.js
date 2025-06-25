import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Category = sequelize.define('Category', {
  name: { type: DataTypes.STRING, unique: true },
  description: DataTypes.TEXT,
}, {
  timestamps: true,
  tableName: 'categories',
});

export default Category;
