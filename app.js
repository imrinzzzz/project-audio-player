var express = require('express');
var path = require('path');
var routes = require('./router/');
var favicon = require('serve-favicon')
var app = express();

app.use(express.static(__dirname + '/public'));
app.set('views', path.join( __dirname, '/views'))
app.use(favicon(path.join(__dirname, 'public', 'img', 'icon.ico')));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', routes)

const port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log('App is running on port ' + port)
})