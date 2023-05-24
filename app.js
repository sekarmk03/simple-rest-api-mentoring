require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const router = require('./routes/student');

const { HTTP_PORT } = process.env;

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/', router);

app.use((req, res, next) => {
    return res.status(404).json({
        status: 'NOT_FOUND',
        message: 'Are you lost?',
        data: null
    });
});

app.use((err, req, res, next) => {
    return res.status(500).json({
        status: 'INTERNAL_SERVER_ERROR',
        message: err.message,
        data: null
    });
});

app.listen(HTTP_PORT, () => console.log(`listening on port ${HTTP_PORT}`));