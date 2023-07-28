const express = require('express');
const adminRoutes = require('./app/routes/admin')
const apiRoutes = require('./app/routes/api')
const errorHandler = require('./util/errorHandler');

module.exports = (app) => {

    app.use(express.json({}));
    app.use(express.urlencoded({ extended: true }));

    app.use('/admin', adminRoutes)
    app.use('/api/v1', apiRoutes)

    app.use(errorHandler.invalidEndPoint)

    app.use((error, _request, response, _next) => {
        return response.status(error.statusCode || 403).json(errorHandler.makeErrorResponse(error))
    })

}