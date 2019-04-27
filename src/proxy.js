var express = require('express')
var httpProxy = require('http-proxy-middleware')
var colors = require('colors')
var config = require('./config-parser')
var path = require('path')

function startServer() {
    if(typeof config === 'undefined') {
        throw 'Please set configuration file correctly.'
    }

    if(typeof config.options === 'undefined') {
        config.options = {}
    }

    var port = config.port || 9000

    if(typeof config.options.target === 'undefined') {
        config.options.target = 'http://localhost:' + port
    }

    if(typeof config.public === 'undefined') {
        config.public = []
    }else if(config.public.constructor !== Array){
        throw 'The public field in configuration file must be an array.'
    }

    var proxy = httpProxy(config.options)

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