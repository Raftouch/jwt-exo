require('dotenv').config()

const express = require('express')
const app = express()
const port = 5000

const jwt = require('jsonwebtoken')

// to be sure that our server can handle it --->
app.use(express.json())

const posts = [
    {
        username: 'Bob',
        title: 'post one'
    },
    {
        username: 'Marley',
        title: 'post two'
    }
]

app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name))
})

app.post('/login', (req, res) => {
    // Authenticate User (username & password)

    // check if the same user
    const username = req.body.username
    const user = { name: username }

    // create jwt
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET_KEY)
    res.json({ accessToken: accessToken })
})

// create middleware to authenticate our token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

app.listen(port, () => console.log(`app is listening on port ${port}`))