const { body, validationResult } = require('express-validator');
var morgan = require('morgan')
const express = require('express')
const app = express()
const db = require('./db.json')


app.use(express.json())
app.use(morgan(':method :url :status :user-type'))

app.get('/db', (req,res) => {
    res.status(200).json(db)
})

app.get('/db/:id',(req,res) => {
    const id = parseInt(req.params.id)
    const unv = db.find(unv => unv.id === id)
    res.status(200).json(unv)

})

app.post('/db', //path

    body('id').isInt().notEmpty,
    body('web_pages').isURL().trim().escape(),
    body('name').isString(),
    body('alpha_two_code').isString().isLength({max: 2}),
    body('domains').isURL().trim().escape(),
    body('country').isLength({ min: 5 }),

     (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

    db.push({
        id : req.body.id,
        web_pages : req.body.web_pages,
        name : req.body.name,
        alpha_two_code : req.body.alpha_two_code,
        domains : req.body.domains,
        country : req.body.country
    })
     res.status(200).json(db)
})
app.put('/db/:id', (req,res) => {
    const id = parseInt(req.params.id)
    let unv = db.find(unv => unv.id === id)

    unv.web_pages = req.body.web_pages,
    unv.name =req.body.name,
    unv.alpha_two_code = req.body.alpha_two_code,
    unv.domains = req.body.domains,
    unv.country = req.body.country

    res.status(200).json(unv)
})

app.delete('/db/:id', (req,res) => {
    const id = parseInt(req.params.id)
    let unv = db.find(unv => unv.id === id)
    db.splice(db.indexOf(unv),1)
    res.status(200).json(db)
})
 
module.exports= app.listen(3000, () => {
    console.log("Serveur à l'écoute")
})
