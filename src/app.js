const path = require('path')
const express = require('express')
const getGeoCode = require('./utils/geocode')
const getWeather = require('./utils/forecast')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000

// Configure paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

hbs.registerPartials(partialsPath)

// Setup handleBars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

// Setup static directory  to serve
app.use(express.static(publicDirPath))


app.get('', (req,res) => {
    res.render('index', {
        title: 'Dynamic Home',
        name: 'Avnish'
    })
})
app.get('/help', (req,res) => {
    res.render('index', {
        title: 'dynamic help',
        name: 'Karan'
    })
})
app.get('/about', (req,res) => {
    res.render('index', {
        title: 'dynamic about',
        name: 'Sahil'
    })
})
app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send('Please provide address')
    }
    getGeoCode(req.query.address, (err,{latitude,longitude} = {}) => {
        if(err) {
            console.log('err',err)
            res.send(err)
        }
        else {
            getWeather(longitude,latitude, (weather) => {
                res.send({
                    // forecast : 'Its 40 degrees out',
                    forecast : weather,
                    location: 'Shahabad Markanda',
                    address: req.query.address,
                    longitude: longitude,
                    latitude: latitude
                })
            })
        }
        
    })
    
})
app.get('/help/me', (req,res) => {
    res.send('Me help page')
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        name: 'Avnish',
        errorMsg: 'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        name: 'Avnish',
        errorMsg: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('server running on ' + port)
})