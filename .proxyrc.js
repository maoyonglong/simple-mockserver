module.exports = {
    "options": {
        "target": {
            "host": "localhost",
            "port": 9000
        },
        "pathRewrite": function(path, req) {
            if(path.indexOf('/api')) {
                return path.replace('/api', '') + '.json'
            }
        }
    },
    "public": {
    }
}