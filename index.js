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

app.get('/posts', (req, res) => {
    res.json(posts)
})

app.post('/login', (req, res) => {
    // Authenticate User (username & password)

    // check if the same user
    const username = req.body.username
    const user = { name: username }

    // create jwt
    jwt.sign(user, process.env.ACCESS_TOKEN_SECRET_KEY)
})

app.listen(port, () => console.log(`app is listening on port ${port}`))