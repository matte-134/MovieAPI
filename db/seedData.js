const seedUsers = [
    {
        username: "Matthew",
        password: "123456",
        age: 31
    },
    {
        username: "Bob",
        password: "123456",
        age: 21
    },
    {
        username: "Luke",
        password: "654321",
        age: 19
    },
    {
        username: "Jamie",
        password: "098765",
        age: 18
    },
    {
        username: "George",
        password: "geroge123",
        age: 51
    },
    {
        username: "Beth",
        password: "charlie23",
        age: 13
    },
    {
        username: "Joy",
        password: "543210",
        age: 31
    }
]
const seedShows = [
    {
        movie: "Avengers",
        description: "Amazing movie",
        genre: "action"
    },
    {
        movie: "Saw",
        description: "Gorey movie",
        genre: "horror"
    },
    {
        movie: "The Strangers",
        description: "Creepy movie",
        genre: "horror"
    },
    {
        movie: "Love Actually",
        description: "Romance movie",
        genre: "Romcom"
    },
    {
        movie: "Batman",
        description: "The new one",
        genre: "action"
    },
    {
        movie: "This is 40",
        description: "Funny movie",
        genre: "comedy"
    }
]

module.exports = {seedShows, seedUsers}
