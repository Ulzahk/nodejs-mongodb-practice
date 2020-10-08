const express = require('express')
const MongoClient = require('mongodb').MongoClient
const {PORT, DB_URL} = require('./config')
const app = express()

let db

MongoClient.connect(DB_URL,{
    useUnifiedTopology: true
}, (err, database) => {
    if(err) return console.error(err)
    console.log('Connected to Database')
    db = database
})

app.get('/movies', async  (req, res, next) => {
    try {
        await db
        const database = db.db('backend_node_js')
        const collection = database.collection('movies')
        const movies = await collection.find().toArray()
        res.status(200).json({
            message: 'Movies listed',
            body: movies
        })
    } catch (error) {
        next(error)
    }
})

app.get('/', (req, res, next) => {
    res.send('Server Status: 🟢 Online')
})


app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`)
})

