const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const app = express()
const port = config.get('port') || 3000
const mongoUri = config.get('mongoUri')

app.use('/api/auth', require('./routs/auth'))
app.use('/api/table', require('./routs/table'))

const start = async () => {
    try {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true
        })
        app.listen(port, () => {
            console.log(`Server started on port ${port}`)
        })
    } catch (e) {
        console.log('error: ', e)
        throw new Error('Error connect to DB')
    }
}


void start()
