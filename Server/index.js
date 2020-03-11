const express = require('express')
const cors = require('cors')

const app = express();

app.use(cors())
app.use(express.json())

app.get('/', (req,res)=>{
    res.json({
        "message":"funfando"
    })
})

function isValidDweet(Dweet){
    return Dweet.name && Dweet.name.toString().trim() !== '' &&
    Dweet.content && Dweet.content.toString().trim() !== ''
}
app.post('/Dweets',(req,res)=>{
    if(isValidDweet(req.body)){
        //insert into database
        const Dweet = {
            name : req.body.name.toString(),
            content: req.body.content.toString()
        };
        
        console.log(Dweet)

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