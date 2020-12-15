var express = require('express');
var exphbs  = require('express-handlebars');
const path = require('path');
const logger = require('morgan');
var port = process.env.PORT || 3000

const indexRouter = require('./routes/indexRoutes');

var app = express();
 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.static('assets'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
 
app.use('/assets', express.static(__dirname + '/assets'));

app.use('/', indexRouter);

app.listen(port); 