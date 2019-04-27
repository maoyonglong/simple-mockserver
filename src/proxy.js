var express = require('express')
var httpProxy = require('http-proxy-middleware')
var colors = require('colors')
var config = require('./config-parser')
var path = require('path')

function startServer() {
    var proxy = httpProxy(config.options)

    var port = config.port || 9000

    var app = express()

    config.public.forEach(function(item) {
        app.use(express.static(item))
    })

    app.use(proxy)

    app.listen(port, function() {
        var tip = 'server has been started, listening in port ' + port

        console.log(tip.green)
    })
}

module.exports = startServer