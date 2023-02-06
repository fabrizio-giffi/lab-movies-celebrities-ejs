const router = require('express').Router()
const Movie = require("../models/Movie.model")
const Celebrity = require("../models/Celebrity.model")


// This route will render the new-movie.ejs view with the form to create a new Movie.
// We get all the celebs from the DB in order to display them as option of the Form.
router.get("/create", async (req, res) => {
    const allCelebs = await Celebrity.find()
    res.render("movies/new-movie.ejs", {allCelebs})
})


// This route will get the POST request from the form and will create a new movie
// inside the database with the properties extracted from the req.body.
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


// This route will render the movies.ejs view to display all the movies in the DB
router.get("/", async (req, res) =>{
    try{
        const allMovies = await Movie.find()
        res.render("movies/movies", { allMovies })
    }
    catch (error) {
        console.log(error)
        res.redirect("/")
    }
})


// This route will get the id from the a tag of movies.ejs and will render the
// movie-detail.ejs to display the details of a specific movie
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


// This route will catch a POST request from the movie-detail.ejs view and
// delete the movie that corresponds to the ID sent by the request
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


// This route will catch a GET request from the movie-detail.ejs view and
// render the edit-movie.ejs to allow users to edit movie details
router.get("/:id/edit", async (req, res) =>{
    try {
        const allCelebs = await Celebrity.find()
        const movieFound = await Movie.findById(req.params.id).populate("cast")
        res.render("movies/edit-movie", { movieFound, allCelebs })
    }
    catch(error) {
        console.log(error)
        res.redirect("/movies")
    }
})


// This route will catch the POST request from the edit-movie.ejs and will
// update the selected movie according to the changes that req.body carries
router.post("/:id/edit", async (req, res) =>{
    try {
        await Movie.findByIdAndUpdate(req.params.id, {...req.body})
        res.redirect(`/movies/${req.params.id}`)
    }
    catch(error) {
        console.log(error)
        res.redirect("/movies")
    }
})

module.exports = router