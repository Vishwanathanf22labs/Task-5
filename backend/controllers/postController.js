import sequelize from '../config/db.js';
import db from '../models/index.js';
import postSchema from '../schemas/postSchema.js';

const { Post, User, Tag, Category } = db;

export const getAllPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;
    const tag = req.query.tag;
    const category = req.query.category;

    let whereClause = '';
    const replacements = [];

    if (category) {
      whereClause += ` AND c.name = ?`;
      replacements.push(category);
    }

    if (tag) {
      whereClause += ` AND t.name = ?`;
      replacements.push(tag);
    }

    const baseQuery = `FROM posts p LEFT JOIN users u ON p.UserId = u.id LEFT JOIN categories c ON p.CategoryId = c.id LEFT JOIN post_tags pt ON p.id = pt.PostId LEFT JOIN tags t ON pt.TagId = t.id WHERE 1=1`;

    const countQuery = `SELECT COUNT(DISTINCT p.id) as total ${baseQuery}`;
    const [countResult] = await sequelize.query(countQuery, {
      replacements,
      type: sequelize.QueryTypes.SELECT
    });
    const totalPosts = countResult.total;

    const dataQuery = `
      SELECT
      p.id,
      p.title,
      p.content,
      p.createdAt,
      u.username,
      c.id AS categoryId,
      c.name AS category,
      GROUP_CONCAT(DISTINCT t.name) AS tags
      ${baseQuery}
      GROUP BY p.id
      ORDER BY p.createdAt DESC
      LIMIT ? OFFSET ?
    `;
    replacements.push(limit, offset);

    const posts = await sequelize.query(dataQuery, {
      replacements,
      type: sequelize.QueryTypes.SELECT
    });

    res.status(200).json({
      posts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalPosts / limit),
        totalPosts
      }
    });

  } catch (err) {
    next(err);
  }
};

export const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      attributes: ['id', 'title', 'content', 'createdAt', 'updatedAt', 'CategoryId'], 
      include: [
        { model: User, attributes: ['username'] },
        { model: Category, attributes: ['name'] },
        { model: Tag, attributes: ['name'], through: { attributes: [] } }
      ]
    });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

export const createPost = async (req, res, next) => {
  try {
    const validatedData = postSchema.parse(req.body);
    const { title, content, categoryId, tags = [] } = validatedData;

    const post = await Post.create({
      title,
      content,
      UserId: req.user.id,
      CategoryId: categoryId
    });

    if (tags.length) {
      const tagInstances = await Promise.all(
        tags.map(async (name) => {
          const [tag] = await Tag.findOrCreate({ where: { name } });
          return tag;
        })
      );
      await post.setTags(tagInstances);
    }

    const fullPost = await Post.findByPk(post.id, {
      include: [{ model: Tag }]
    });

    res.status(201).json(fullPost);
  } catch (err) {
    next(err);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const validatedData = postSchema.parse(req.body);
    const { title, content, categoryId, tags = [] } = validatedData;

    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    await post.update({ title, content, CategoryId: categoryId });

    if (tags.length) {
      const tagInstances = await Promise.all(
        tags.map(async (name) => {
          const [tag] = await Tag.findOrCreate({ where: { name } });
          return tag;
        })
      );
      await post.setTags(tagInstances);
    }

    const updatedPost = await Post.findByPk(req.params.id, {
      include: [{ model: Tag }]
    });

    res.status(200).json(updatedPost);
  } catch (err) {
    next(err);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    await post.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
