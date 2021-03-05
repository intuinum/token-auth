const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const helemet = require('helmet');
const userAuthRoute = require('./routes/user.route');
const { authorize } = require('./middleware/token');

app.use(morgan('tiny'));
app.use(cors());
app.use(helemet());
app.use(express.json());

app.use('/api/users', userAuthRoute);
app.get('/', authorize, (req, res) => {
    res.status(200).json({ message: 'Protected data' });
})

module.exports = app;