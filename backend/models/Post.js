import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Post = sequelize.define('Post', {
  title: { type: DataTypes.STRING, unique: true },
  content: DataTypes.TEXT
}, {
  timestamps: true,
  tableName: 'posts',
});

export default Post;
