const {buildDB} = require('./db/buildDB')
const express = require('express')
const app = express()
const {Shows, User} = require('./models/index')
const {userRt, showsRt} = require('./routes')

buildDB()

app.use(express.json())
app.use('/shows', showsRt)
app.use('/user', userRt)


app.listen(3000, () => {
    console.log('The server is live and listening at http://localhost:3000')
})