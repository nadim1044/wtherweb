const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geoCode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app = express()
const port= process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Nadim Ansari'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Nadim Ansari'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Nadim Ansari'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({error:'Please provide address'})
    }
    geoCode(req.query.address,(error,{latitude,longitude,location}={}) => {

        if(error){
            return console.log(error)
        }
        forecast (latitude,longitude,(error,{temprature})=>{
            if(error){
                return console.log(error)
            }
            res.send({
                forecast: temprature,
                location: location,
                address:  req.query.address
            })
        })
    })
    
})

app.get('/help/*', (req, res) => {
    res.render('error',{title:'Error',name:'Nadim Ansari', errorMessage : 'Help unit not found'})
})

app.get('*', (req, res) => {
    res.render('error',{title:'Error',name:'Nadim Ansari', errorMessage:'page not found'})
})

app.listen(port, () => {
    console.log('Server is up on port 3000.')
})