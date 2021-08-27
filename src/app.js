const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectory = path.join(__dirname, '../public') // goes on dir up and goes to public folder
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
    //////////////////

//Setup handlebars engine and views location
app.set('view engine', 'hbs') // this is a dynamic handlebar
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
    ///////////////////

//setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => { // to render the index.hbs html file. We used the hbs to use dynamic template
    res.render('index', {
        title: 'Weather',
        name: 'Mamnoon Ahmed Sami',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Mamnoon Ahmed Sami"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: "I need help as well.",
        title: 'Help',
        name: 'Mamnoon Ahmed Sami'
    })
})

/* in a web page there can be three pages, like app.com, app.com/help, app.com/about
 we have to write separate app.get() functions which takes two parameters */

/* we dont need this part of code because, app.use(express.static(publicDirectory)) is going to render the index.html 
app.get('', (request, response) => {
    response.send('<h1>Hello Brother!</h1>')
})*/


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Enter an address"
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
            })
        })

    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You have to provide a search value"
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })

})
app.get('/help/*', (req, res) => { // if any page like localhost:3000/help/jfjdf , this will generate the error message
    res.render('404', {
        title: '404',
        name: "Mamnoon Ahmed Sami",
        errorMessage: "Help article not found"
    })
})

app.get('*', (req, res) => { // if any invalid link is typed like localhost:3000/jefjbf , this will show 404 error message
    res.render('404', {
        title: '404',
        name: "Mamnoon Ahmed Sami",
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
        console.log('Server is online on port ' + port)
    }) // starts the server, 3000 is common developer port, for http its 80, 3000 for local developement port