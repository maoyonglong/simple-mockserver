var fs = require('fs')

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

module.exports = getConfig()