# metalsmith-express

[express](http://expressjs.com/) based middleware for [metalsmith](http://www.metalsmith.io/) for local development and testing.

By default, this will use `express.static` to serve your `metalsmith` built files. It also 
uses `connect-livereload` which works well in conjunction with [`metalsmith-watch`](https://github.com/FWeinb/metalsmith-watch) for development purposes.

To disable `connect-livereload` see options below.

### Usage
```javascript
var metalsmith        = require('metalsmith');
var watch             = require('metalsmith-watch');
var metalsmithExpress = require('metalsmith-express');

metalsmith(__dirname)
  .use(metalsmithExpress())
  .use (
    watch({
      paths: {
        '${source}/**/*': true
      },
      livereload: true
    })
  )
  .build(function(err) {
    if (err) throw err;
  });
```

### Options

```json
{
  "liveReload": true,
  "liveReloadPort": 35729,
  "middleware": []
}
```
You may use  `express` middleware by pushing it onto the `middleware` option array. Currently only the `use(function(req,res,next))` convention is supported.
```javascript
var middleware = [];

middleware.push(function(req, res, next) {
  console.log('Time:', Date.now());
  next();  
});

var metalsmithExpress = require('metalsmith-express')
({
  middleware: middleware
});
```

### Todo
  * Allow for any valid middleware pattern

### License
MIT

