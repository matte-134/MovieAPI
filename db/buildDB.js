const {db} = require('./index')
const {seedShows, seedUsers} = require('./seedData')
const {User, Shows} = require('../models/index')

let populateDataBase = async () => {
    await db.sync({ force: true })
    await Promise.all(seedUsers.map((c) => {User.create(c)}))
    await Promise.all(seedShows.map((c) => {Shows.create(c)}))
}

let buildDB = async () => {
    await populateDataBase()
}

module.exports = {buildDB}