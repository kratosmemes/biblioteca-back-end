const express = require('express');
const app = express();

app.use('/authentication',  require('./authenticationRoutes'));
app.use('/user',            require('./usuario'));
app.use('/book',            require('./libro'));
app.use('/loan',            require('./prestamo'));
app.use('/image',           require('./imagen'));

module.exports = app;