import sequelize from '../config/db.js';
import User from './User.js';
import Post from './Post.js';
import Category from './Category.js';
import Tag from './Tag.js';


User.hasMany(Post);
Post.belongsTo(User);

Category.hasMany(Post);
Post.belongsTo(Category);

Post.belongsToMany(Tag, { through: 'post_tags' });
Tag.belongsToMany(Post, { through: 'post_tags' });

const db = { sequelize, User, Post, Category, Tag };

export default db;
