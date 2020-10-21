// Require Packages
require('dotenv').config({path: __dirname+'/.env'})
var cors = require('cors')
var express = require('express')
var app = express()
var mongoose = require('mongoose')
var { nanoid } = require('nanoid')
var bodyParser = require('body-parser')

// Set success response
app.use(cors({optionsSuccessStatus:200}))
// Set public files directory
app.use(express.static(__dirname+'/public'))
// Parse encoded POST requests
app.use(bodyParser.urlencoded({ extended: true }));

// Route request for homepage
app.get( '/', (req, res)=>{
    res.sendFile(__dirname+'/views/index.html')
})

// Open connection to mongo db
mongoose.connect(
    process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

// Test connection
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', ()=>{
    console.log('Successfully connected to MongoDB.')
})

// Setup Schema for Documents
const { Schema } = mongoose
var newUrlSchema = new Schema({
    original_url: {type: String, required: true},
    slug: String
}, {collection: 'short-urls'})

var Url = mongoose.model('Url', newUrlSchema)

// POST new long url via homepage form
app.post('/api/shorturl/new', (req, res) => {
    Url.create(
        {
            original_url: req.body.url, 
            slug: nanoid(5)
        }, 
        (err, data) => {
            if(err) return console.error(err)
            res.json({"original_url": data.original_url, "short_url": data.slug})
        }
    )
})

// GET long url from passed short url
app.get('/api/shorturl/:slug', async (req, res) => {
    data = await Url.findOne({'slug': req.params.slug}).exec()
    res.redirect(302, data.original_url)
})


// Start listening on port 3000 (or as defined in .env)
var listener = app.listen(process.env.PORT || 3000, ()=>{
    console.log(`App is listening on port ${listener.address().port}`)
})