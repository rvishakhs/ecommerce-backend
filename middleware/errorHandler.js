// if the file is not found

const notfound = (req, res, next) => {
    const error = new Error(`Not found ${req.originalUrl}`);
    res.status(404);
    next(error);
}

// error handler

const errorhandler = (error, req, res, next) => {
    const statuscode = res.statusCode == 200 ? 500 : res.statusCode;
    res.statusCode = statuscode;
    res.json({
        message : error?.message,
        stack : error?.stack
    });
}

module.exports = {errorhandler, notfound}