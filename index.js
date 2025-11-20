const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const authRoutes = require('./src/route/auth.route');
const roleRoutes = require('./src/route/role.route');
const adminRoutes = require('./src/route/admin.route');
const apiroutes = require('./src/route/route');


const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());


// Regular middleware for other routes
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true
}));
app.use(bodyParser.json());

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/role', roleRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', apiroutes);


app.use((err, req, res, next) => {
    console.error('Error:', err && err.message ? err.message : err);
    res.status(err && err.status ? err.status : 500).json({
        success: false,
        message: err && err.message ? err.message : 'Internal server error',
    });
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});