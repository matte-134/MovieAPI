const express = require('express')
const {check, validationResult} = require('express-validator')
const showsRt = express.Router()
const {Shows, User} = require('../models/index')

showsRt.get('/', async (req, res) => {
    const shows = await Shows.findAll()
    res.send(shows.movie)
})

showsRt.get('/:movie', async (req, res) => {
    let inputMovie = req.params.movie.split('.').join(' ')
    words = inputMovie.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    inputMovie = words.join(" ")
    const queriedShow = await Shows.findOne({
        where: {
            movie: inputMovie
        }
    })
    if (!queriedShow) {
        res.send("That show does not exist")
        return
    }
    let {movie, description, genre, rating} = queriedShow
    let payload  = {
        movie: movie,
        description: description,
        genre: genre,
        rating: rating
    }
    res.send(payload)
})

showsRt.get('/genre/:genre', async (req, res) => {
    const queriedGenre = await Shows.findAll({
        where: {
            genre: req.params.genre
        }
    })
    if (!queriedGenre) {
        res.send("There are no shows of that genre")
        return
    }
    let movies = queriedGenre.movie
    let moviesArr = []
    for (let i = 0; i < queriedGenre.length; i++) {
        let indMovie = queriedGenre[i].toJSON()
        moviesArr.push(indMovie.movie)
    }
    res.send(moviesArr)
})

showsRt.post('/new', [check("movie").trim().not().isEmpty(), check("genre").trim().not().isEmpty()], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({errors: error.array()})
        return
    }
    await Shows.create(req.body)
    res.send("show created")
})

showsRt.put('/:username', async (req, res) => {
    let inputUser = req.params.username.charAt(0).toUpperCase() + req.params.username.slice(1)
    let foundUser = await User.findOne({
        where: {
            username: inputUser
        }
    })
    if (!foundUser) {
        res.send("That user does not exist")
        return
    }
    let movie = await Shows.findOne({
        where: {
            movie: req.body.movie
        }
    })
    await foundUser.addShow(movie)
    res.sendStatus(200)
})

showsRt.put('/rating/:movie', [check("rating").not().isEmpty()], async (req, res) => {
    let inputMovie = req.params.movie.split('.').join(' ')
    words = inputMovie.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    inputMovie = words.join(" ")
    let updateRating = await Shows.update(
        { rating: req.body.rating },
        { where: {
            movie: inputMovie
        }})
    res.send('Rating has been updated')
})

showsRt.delete('/delete/:movie', async (req, res) => {
    let movie = req.params.movie.split('.').join(' ')
    console.log(movie)
    await Shows.destroy({
        where: {
            movie: movie
        }
    })
    res.send('Movie has been deleted')
})

module.exports = {showsRt}