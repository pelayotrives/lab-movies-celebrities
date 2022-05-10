const res = require("express/lib/response");
const ModelMovie = require("../models/Movie.model");
const ModelCelebrities = require("../models/Celebrity.model.js");
const { Model } = require("mongoose");

const router = require("express").Router();

//GET (movies/create) => Crear nueva película

router.get("/create", (req, res, next) => {
    ModelCelebrities.find().select("name")
    .then((allCelebs) => {
        res.render("movies/new-movie.hbs", {
            allCelebs
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

// GET "/movies" => Muestra el listado de películas

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

// GET "/movies/:id/details" => Muestra los detalles de la película

router.get("/:id/details", (req, res, next) => {
    const { id } = req.params;

    ModelMovie.findById(id).populate("cast")

    .then((movieDetail) => {
        //console.log(movieDetail)

        res.render("movies/movie-details.hbs", {
            movieDetail,
        })
    })
    .catch((err) => {
        next(err)
    })
})


router.post("/:id/delete", (req,res,next) => {
    const { id } = req.params;

    ModelMovie.findByIdAndRemove(id)
    .then((response) => {
        res.redirect("/movies")
    })
    .catch((err) => {
        next(err)
    })

})

router.get("/:id/edit", (req,res,next) => {
    const { id } = req.params;

    ModelCelebrities.find().select("name")
    .then((allCelebs) => {
        ModelMovie.findById(id)
        .then((movie) => {
            res.render("movies/edit-movie.hbs", {
                movie,
                allCelebs
            })
        })
        .catch((err) => {
            next(err)
        })
    })
    .catch((err) => {
        next(err)
    })
    
})

router.post("/:id/edit", (req,res,next) => {

    const { id } = req.params;
    const { title, genre, plot, cast } = req.body

    ModelMovie.findByIdAndUpdate(id, {
        title,
        genre,
        plot,
        cast
    })
    .then((response) => {
        res.redirect(`/movies/${id}/details`)
    })
    .catch((err) => {
        next(err)
    })

})


module.exports = router