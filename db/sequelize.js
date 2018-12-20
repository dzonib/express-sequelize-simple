const Sequelize = require('sequelize')

const UserModel = require('../models/user')
const BlogModel = require('../models/blog')
const TagModel = require('../models/tag')

const sequelize = new Sequelize('postgres://dzonib:123456@localhost:5433/learning')


const User = UserModel(sequelize, Sequelize)
const BlogTag = sequelize.define('blog_tag', {})
const Blog = BlogModel(sequelize, Sequelize)
const Tag = TagModel(sequelize, Sequelize)


Blog.belongsToMany(Tag, { through: BlogTag, unique: false })
Tag.belongsToMany(Blog, { through: BlogTag, unique: false})
Blog.belongsTo(User)

// { force: true }
sequelize.sync().then(() => console.log('Database & tables created!'))

module.exports = {
	User,
	Blog,
	Tag
}
