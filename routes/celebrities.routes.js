const router = require("express").Router();
const ModelCelebrities = require("../models/Celebrity.model.js")


// GET "/celebrities/create" => Creae nuevas celebrities
router.get("/create", (req, res, next) => {
    res.render("celebrities/new-celebrity.hbs");
})

//POST "/celebrities/create" => Enviar información de formulario

router.post("/create", (req, res, next) => { 
    const {name, occupation, catchPhrase} = req.body;
    ModelCelebrities.create({
        name,
        occupation,
        catchPhrase
    })
    .then((response) => {
        res.redirect("/celebrities")
    })
    .catch((err) => {
        res.render("celebrities/new-celebrity.hbs")
        console.log(err);
    })
})

// GET "/celebrities" => lista las celebrities
router.get("/", (req,res,next) => {
    ModelCelebrities.find()
    .then((allCeleb) => {
        res.render("celebrities/celebrities.hbs", {
            allCeleb
        })
    })
    .catch((err) => {
        next(err)
    })
})




module.exports = router