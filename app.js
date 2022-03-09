const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

const app=express()

//plantillas

app.set('view engine', 'ejs')

//archivos estaticos

app.use(express.static('public'))

//config formularios
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//variables de ambiente
dotenv.config({path: './env/.env'})

//cookies
app.use(cookieParser())

//llamar al router
app.use('/', require('./routes/routes'))


app.listen(3000, ()=>{
    console.log('servidor en puerto https://localhost:3000')
})