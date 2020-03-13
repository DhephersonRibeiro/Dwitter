const express = require('express');
const monk = require('monk'); 
const cors = require('cors');

const Filter = require('bad-words');
const rateLimit = require('express-rate-limit');

const app = express();

app.use(cors());
app.use(express.json());


const db = monk('localhost/Dwitter');
const Dweets = db.get('Dweets');

const filter = new Filter();

app.get('/', (req,res)=>{
    res.send(null)
});

app.get('/Dweets',(req,res)=>{
    Dweets 
        .find()
        .then(Dweets => {
            res.json(Dweets)
        })
});

function isValidDweet(Dweet){
    return Dweet.name && Dweet.name.toString().trim() !== '' &&
    Dweet.content && Dweet.content.toString().trim() !== ''
};

app.use(rateLimit({
    windowMs:30 * 1000,
    max:1
}));

app.post('/Dweets',(req,res)=>{
    if(isValidDweet(req.body)){
        
        const Dweet = {
            name : filter.clean(req.body.name.toString()),
            content: filter.clean(req.body.content.toString()),
            created: new Date()
        };
        
        Dweets 
        .insert(Dweet)
        .then(createdDweets => {
            res.json(createdDweets)
        });

    }else {
        res.status(422)
        res.json({
            "message":"preencha os campos corretamente!"
        });
    };
});

app.listen(5000, () =>{ 
    console.log("Listening on http://localhost:5000")
});