const {DataTypes, db} = require('../db')

const User = db.define('user', {
    username: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    age: {
        type: DataTypes.INTEGER,
    }
})

module.exports = { User }
