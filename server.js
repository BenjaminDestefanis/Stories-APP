const express = require('express');
const app = express();
const path = require('path')

//PORT
const PORT = process.env.PORT || 3000;


//Middleware
app.use('/', express.static(path.join(__dirname, '/public')))
app.use('/', require('./routes/root'))


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


//Server listen
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))