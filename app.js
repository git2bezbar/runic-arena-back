var express = require('express');
var cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cardsRouter = require('./routes/cards');
var classesRouter = require('./routes/classes');
var skillsRouter = require('./routes/skills');
var typesRouter = require('./routes/types');
var abilitiesRouter = require('./routes/abilities');
var conditionsRouter = require('./routes/conditions');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/cards', cardsRouter);
app.use('/classes', classesRouter);
app.use('/skills', skillsRouter);
app.use('/types', typesRouter);
app.use('/abilities', abilitiesRouter);
app.use('/conditions', conditionsRouter);

module.exports = app;
