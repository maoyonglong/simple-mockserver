var minimatch = require('minimatch')

function pathRewrite(obj) {
    if(typeof a === 'function') {
        return obj
    }

    var objHasDollar = false
    var remember = {}

    for(var key in obj) {
        var val = obj[key]
        if(/\$/.test(key)) {
            objHasDollar = true
            break
        }
    }

    return objHasDollar ? function (path, req) {
        if(remember[path] !== undefined) {
            return remember[path]
        }
        for(var key in obj) {
            var val = obj[key]
            var hasDollar = /\$/.test(key)
            var origin = key
            var target = val
            if(hasDollar) {
                var dollarReplaceResult = dollarReplace(path, key, val)
                origin = dollarReplaceResult.origin
                target = dollarReplaceResult.target
            }
            if(origin.startsWith('^')) {
                origin = origin.substr(1)
            }
            var isMatch = minimatch(path, origin)
            if(isMatch) {
                remember[path] = target
                return target
            }
        }
        throw "Error: Can't find this address."
    } : obj

    function dollarReplace(path, origin, target) {
        var originArr = origin.split('/')
        var pathArr = path.split('/')
        var $ = []
        originArr.forEach((item, idx) => {
            if(item === '$') {
                originArr[idx] = pathArr[idx]
                $.push(pathArr[idx])
            }
        })
        var i = 0
        var target = target.replace(/\$/g, function() {
            return $[i++]
        })
        return {
            origin: originArr.join('/'),
            target
        }
    }
}

module.exports = {
    pathRewrite
}