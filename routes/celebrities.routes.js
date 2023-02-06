const router = require('express').Router()
const Celebrity = require("../models/Celebrity.model")

router.get("/create", (req, res) => {
    res.render("celebrities/new-celebrity.ejs")
})

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