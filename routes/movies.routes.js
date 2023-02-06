const router = require('express').Router()
const Movie = require("../models/Movie.model")
const Celebrity = require("../models/Celebrity.model")

router.get("/create", async (req, res) => {
    const allCelebs = await Celebrity.find()
    res.render("movies/new-movie.ejs", {allCelebs})
})

router.post("/create", async (req, res) => {
    try{
        const newMovie = req.body
        await Movie.create({...newMovie})
        res.redirect("/movies")
    }
    catch (error) {
        console.log("There was an error creating the movie.")
        res.render("movies/new-movie.ejs")
    }
})

router.get("/", async (req, res) =>{
    try{
        const allMovies = await Movie.find()
        res.render("movies/movies", {allMovies})
    }
    catch (error) {
        console.log(error)
        res.redirect("/")
    }
})

router.get("/:id", async (req, res) => {
    try {
        const movieFound = await Movie.findById(req.params.id).populate("cast")
        res.render("movies/movie-detail", { movieFound })
    }
    catch(error) {
        console.log(error)
        res.redirect("/movies")
    }
})

router.post("/:id/delete", async (req, res) =>{
    try {
        await Movie.findByIdAndDelete(req.params.id)
        res.redirect("/movies")
    }
    catch(error) {
        console.log(error)
        res.redirect("/movies")
    }
})

module.exports = router