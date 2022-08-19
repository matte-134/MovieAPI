const express = require('express')
const {check, validationResult} = require('express-validator')
const userRt = express.Router()
const {User, Shows} = require('../models/index')

userRt.get('/', async (req, res) => {
    const users = await User.findAll()
    res.send(users.username)
})

userRt.get('/:username', async (req, res) => {
    let inputUser = req.params.username.charAt(0).toUpperCase() + req.params.username.slice(1)
    const queriedUser = await User.findOne({
        where: {
            username: inputUser
        }
    })
    if (!queriedUser) {
        res.send("That user does not exist")
        return
    }
    let {username, age} = queriedUser
    let payload  = {
        username: username,
        age: age
    }
    res.send(payload)
})

userRt.get('/showswatched/:username', async (req, res) => {
    let inputUser = req.params.username.charAt(0).toUpperCase() + req.params.username.slice(1)
    const queriedUser = await User.findOne({
        include: Shows,
        where: {
            username: inputUser
        }
    })
    if (!queriedUser) {
        res.send("That user does not exist")
        return
    }
    let showsWatched = queriedUser.shows
    console.log(queriedUser.shows)
    let showsArr = []
    for (let i = 0; i < showsWatched.length; i++) {
        let indShow = showsWatched[i].toJSON()
        showsArr.push(indShow.movie)
    }
    res.send(showsArr)
    
})

userRt.post('/new', [check("username").trim().not().isEmpty(), check("password").trim().isLength({min: 6})], async (req, res) => {
    console.log("test")
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()})
        return
    }
    await User.create(req.body)
    res.send("User created")
})


module.exports = {userRt}