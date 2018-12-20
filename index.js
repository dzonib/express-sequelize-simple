const express = require('express')
const bodyParser = require('body-parser')

const { User, Blog, Tag } = require('./db/sequelize')

const app = express()
app.use(bodyParser.json())

// API ENDPOINTS
app.post('/api/users', async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.json(user)
    } catch(e) {
        res.status(400)
    }
})

app.get('/api/users', async (req, res) => {
    try {
        const users = await User.findAll({
            atributes: ['name']
        })
        res.json(users)
    } catch(e) {
        res.status(400)
    }
})

app.post('/api/blog', async (req, res) => {
    try {
        const {tags, text, userId} = req.body
        const something = await tags.map(async (tag) => {
            return await Tag.findOrCreate({ where: {name: tag.name},
                defaults: {name: tag.name}
            }).then(([tag, isCreated]) => {
                return tag
            })
        })
        
        const resolvedTags = await Promise.all(something)
            .then(resolvedSomething => resolvedSomething)

        const blog = await Blog.create(req.body)

        await blog.addTags(resolvedTags)

        console.log(blog.id, "ASDASDASDASDASWQEQWEQWEQWEQWEWQEASDWEQWDASWE")

        const blogWithOtherCrapItsAssosiatedWith = await Blog.find({where: {id: blog.id}, include: [User, Tag]})
            
        res.json(blogWithOtherCrapItsAssosiatedWith)
    } catch(e) {
        res.json(e)
    }
    // .spread((tag, created) => {
    //     res.json(tag)
 
}) 

const port = 3000
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})