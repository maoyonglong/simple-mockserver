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

> Addition:  
To make it easier to map interfaces to `JSON` files, I added the `$` symbol in `pathRewrite` to represent path variables.For example:
```
{
    "options": {
        "pathRewrite": {
            "^/api/$": "/$.json"
        }
    },
    "public": [
        "mock"
    ]
}
```
If you request the url `/api/user`, it will be changed to request `/user.json`. Now, if you have a `user.json` file in mock folder, you can get its data.


## Initalization
```js
var startServer = require('quick-mock-server')
startServer()
```

## Quick Start
1. create a folder named `example` and run the following cmd in this folder
```cmd
npm init
npm install --save-dev quick-mock-server
```
2. make the project with following structure:
```
   example
   |
   |---- mock
   |      |
   |      |---- test.json
   |
   |---- public
   |      |
   |      |---- index.html
   |
   |---- .proxyrc
   |
   |---- index.js
   |
   |---- package.json
```
3. Files content  

// index.js
```js
var startServer = require('quick-mock-server')
startServer()
```
// .proxyrc
```json
{
    "options": {
        "target": {
            "host": "localhost",
            "port": 9000
        },
        "pathRewrite": {
            "^/api/$": "/$.json"
        }
    },
    "public": [
        "public",
        "mock"
    ]
}
```
// public/index.html
```html
<!Doctype html>
<html>
    <head>
        <meta charset = "utf-8" />
        <script src = "https://cdn.bootcss.com/axios/0.19.0-beta.1/axios.js" />
    </head>
    <body></body>
    <script>
        axios.get('/api/test').then(function(res) {
            document.write(JSON.stringify(res.data))
        })
    </script>
</html>
```
// mock/test.json
```json
{
    "key1": "val1",
    "key2": "val2",
    "key3": "val3",
    "key4": "val4",
    "key5": "val5"
}
```
// package.json
```json
{
    ....
    "main": "index.js",
    "script": {
        "start": "node ."
    }
    ...
}
```
4. open the terminal, run `npm start`. You can see `server has been started, listening in port 9000` output in terminal if no error.
5. open `http://localhost:9000` in browser, and you can see the data of `mock/test.json` in web page.