const express = require('express')
const cors = require('cors')
const monk = require('monk');

const app = express();

const db = monk('localhost/Dwitter')
const Dweets = db.get('Dweets')

app.use(cors())
app.use(express.json())

app.get('/', (req,res)=>{
    res.json({
        "message":"funfando"
    })
})

app.get('/Dweets',(req,res)=>{
    Dweets 
        .find()
        .then(Dweets => {
            res.json(Dweets)
        })
})

function isValidDweet(Dweet){
    return Dweet.name && Dweet.name.toString().trim() !== '' &&
    Dweet.content && Dweet.content.toString().trim() !== ''
}
app.post('/Dweets',(req,res)=>{
    if(isValidDweet(req.body)){
        
        const Dweet = {
            name : req.body.name.toString(),
            content: req.body.content.toString(),
            created: new Date()
        };
        
        Dweets 
        .insert(Dweet)
        .then(createdDweets => {
            res.json(createdDweets)
        })

    }else {
        res.status(422)
        res.json({
            "message":"preencha os campos corretamente!"
        })
    }
})
app.listen(5000, () =>{ 
    console.log("Listening on http://localhost:5000")
})