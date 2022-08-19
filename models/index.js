const {Shows} = require('./shows')
const {User} = require('./user')

Shows.belongsToMany(User, {through: "user_shows"})
User.belongsToMany(Shows, {through: "user_shows"})

module.exports = { Shows, User }