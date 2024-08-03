const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config();
const ProductRoute = require('./router/ProductRoute')

const PORT = process.env.port;

const app = express();


app.listen(PORT, (e) => {
    if (e) {
        console.log(`server not running`)
    } else (
        console.log(`server running on PORT ${PORT}`)
    )
});

app.use(cors({ origin: "*" }));

app.use(express.json());

app.use('/api/products',ProductRoute);

// app.use("/public",express.static(__dirname+'/uploads'));

const MONGODB_URL = process.env.MONGODB_URL

mongoose.connect(MONGODB_URL)
    .then(() => console.log(`MongoDB connneted in ${PORT}`))
    .catch(() => console.log(`MongoDB notConnected`))