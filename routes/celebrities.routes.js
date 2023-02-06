const router = require('express').Router()
const Celebrity = require("../models/Celebrity.model")


// This route will render the new-celebrity.ejs to allow users to create
// a new celebrity in the DB
router.get("/create", (req, res) => {
    res.render("celebrities/new-celebrity.ejs")
})


// This route will catch the POST request from the new-celebrity.ejs view
// and will create a new celebrity document into the DB
router.post("/create", async (req, res) => {
    try{
        const newCeleb = req.body
        await Celebrity.create({...newCeleb})
        res.redirect("/celebrities")
    }
    catch (error) {
        console.log("There was an error creating the celebrity.")
        res.render("celebrities/new-celebrity.ejs")
    }
})


// This route will render the celebrities.ejs view to display all the celebrities in the DB
router.get("/", async (req, res) =>{
    try{
        const allCelebs = await Celebrity.find()
        res.render("celebrities/celebrities", {allCelebs})
    }
    catch (error) {
        console.log(error)
        res.redirect("/")
    }
})

module.exports = router