const {DataTypes, db} = require('../db')

const Shows = db.define('shows', {
    movie: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    genre: {
        type: DataTypes.STRING,
    },
    rating: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    screen: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
})

module.exports = {Shows}