require('dotenv').config({ path: '.env.local' })
const express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    Sequelize = require('sequelize'),
    finale = require('finale-rest'),
    http = require('http')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
const server = http.createServer(app)

const database = new Sequelize({
    dialect: 'sqlite',
    storage: './test.sqlite',
})

const Channels = database.define('channels', {
    name: Sequelize.STRING,
})

const Messages = database.define('messages', {
    user: Sequelize.STRING,
    title: Sequelize.STRING,
    body: Sequelize.TEXT,
    channel_id: Sequelize.INTEGER,
})

finale.initialize({
    app: app,
    sequelize: database,
})

finale.resource({ model: Channels, endpoints: ['/channels', '/channels/:id'] })

finale.resource({
    model: Messages,
    endpoints: ['/messages', '/messages/:id'],
    search: {
        param: 'searchByChannel',
        attributes: ['channel_id'],
    },
})

const port = process.env.SERVER_PORT || 3001

database.sync({ force: true }).then(function() {
    server.listen(port)

    Channels.create({
        name: 'Channel 1',
    })
    Channels.create({
        name: 'Channel 2',
    })
    Channels.create({
        name: 'Channel 3',
    })
})
