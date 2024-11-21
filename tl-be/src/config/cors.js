const corsOptions = {
    origin: function (origin, callback) {
        // if (['http://localhost:3000'].indexOf(origin) !== -1) {
        //     callback(null, true);
        // } else {
        //     callback(new Error('Not allowed by CORS'));
        // }
        callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    exposedHeaders: ['Content-Length', 'X-Kuma-Revision'],
    credentials: true,
    maxAge: 600, // Cache preflight request for 10 minutes
    preflightContinue: false,
    optionsSuccessStatus: 204
};

module.exports = corsOptions