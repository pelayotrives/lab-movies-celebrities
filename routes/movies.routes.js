const res = require("express/lib/response");
const ModelMovie = require("../models/Movie.model");

const router = require("express").Router();

//GET (movies/create) => 

router.get("/create", (req, res, next) => {
    ModelMovie.find().select("title")
    .then((movie) => {

        res.render("movies/new-movie.hbs", {
            moviesList: movie
        })

    })
    .catch((err) => {
        next(err)
    })
})

router.post("/create", (req, res, next) => {
    const { title, genre, plot, cast } = req.body
    ModelMovie.create({
        title,
        genre,
        plot,
        cast
    })
    .then((response) => {
        res.redirect("/movies")
    })
    .catch((err) => {
        next(err);
    })
})

// GET 

router.get("/", (req, res, next) => {
    ModelMovie.find().select("title")
    .then((movie) => {
        res.render("movies/movies.hbs", {
            movie
        })
    })
    .catch((err) => {
        next(err)
    })
})

module.exports = router