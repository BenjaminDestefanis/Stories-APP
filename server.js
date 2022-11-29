require('dotenv').config() //Todas las variables gobales

const express = require('express');
const app = express();
const path = require('path')
const cors = require('cors')

const { logger } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConnect')
const mongoose = require('mongoose')
const { logEvents } = require('./middleware/logger')



connectDB()


//PORT
const PORT = process.env.PORT || 3000;

//Middlewares

app.use(logger)
//los cors son para que configuremos desde que sitios pueden acceder a nuestra API a traves de la consola del navegador
app.use(cors(corsOptions))
app.use(express.json())//para que nuestra app pueda entender json
app.use(cookieParser())// captura cokies
app.use('/', express.static(path.join(__dirname, '/public')))
app.use('/', require('./routes/root'))

app.use('/users', require('./routes/userRoutes'))


//Si la ruta no conincide con las anteriores , aplicaremos el estado 404
app.all('*', (req, res) => {
    //si la respuestas es un '404'
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')){
        res.json( { message: "404 not found"} )
    } else {
        res.type('txt').send('404 not found')
    }
})

app.use(errorHandler)


//Server listen

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t ${err.syscall}\t ${err.hostname}`, 'mongoErrLog.log')
})
