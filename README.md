# Introduction
This is a tool to create a web server and mock data quickily. It consists of [express](https://github.com/expressjs/express) and [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware).  

# Usage
## Installation
`npm install --save-dev quick-mock-server`
## Configuration
You can create a configuration file named `.proxyrc`, `.proxyrc.json` or `.proxyrc.js` in the project root directory. In this file, it must be or export a json object.   
This json object is like this:
```json
{
    "options": {
        "target": {
            "host": "localhost",
            "port": 9000
        },
        "pathRewrite": {
            "^/api/": ""
        }
    },
    "public": [
        "public",
        "mock"
    ]
}
```
The options is equal to [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware) and the public is the static folders using [express](https://github.com/expressjs/express) to achieve.