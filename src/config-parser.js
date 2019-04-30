var fs = require('fs')
var { pathRewrite } = require('./path-parser')

function getExistedConfigFileName() {
    var filenames = ['.proxyrc', '.proxyrc.json', '.proxyrc.js']
    for(var i = 0, len = filenames.length; i < len; i++) {
        var filename = filenames[i]
        var isExisted = fs.existsSync(filename)
        if(isExisted) {
            return filename
        }
    }
}

function getConfig() {
    var filename = getExistedConfigFileName()
    try {
        return JSON.parse(fs.readFileSync(filename).toString())
    }catch(err) {
        if (filename === '.proxyrc.js') {
            return require('../../../' + filename)
        }
    }
}

function initConfig(config) {
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

    if(typeof config.options.pathRewrite !== 'undefined') {
        config.options.pathRewrite = pathRewrite(config.options.pathRewrite)
    }

    if(typeof config.public === 'undefined') {
        config.public = []
    }else if(config.public.constructor !== Array){
        throw 'The public field in configuration file must be an array.'
    }
}

module.exports = {
    getConfig,
    initConfig
}