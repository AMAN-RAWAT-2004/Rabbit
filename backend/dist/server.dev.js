"use strict";

var express = require('express');

var cors = require('cors');

var dotenv = require('dotenv');

dotenv.config();
var app = express();

var connectDB = require('./Config/db');

var userRoutes = require('./Routes/userRoutes');

var productRoutes = require('./Routes/productRoute');

var cartRoutes = require('./Routes/cartRoute');

var checkoutRoutes = require('./Routes/checkoutRoute');

var orderRoutes = require('./Routes/orderRoutes');

var uploadRoutes = require('./Routes/uploadRoutes');

var subscribeRoutes = require('./Routes/subscribeRoutes');

var adminRoutes = require('./Routes/adminRoutes');

var productAdminRoutes = require('./Routes/productAdminRoutes');

var adminOrderRoutes = require('./Routes/adminOrderRoutes');

connectDB();
app.use(express.json());
app.use(cors());
var PORT = process.env.PORT || 9000; // CONNECT TO MONGODB

app.get('/', function (req, res) {
  res.send('Welcome to Rabbit Api ');
}); // API ROUTES

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api', subscribeRoutes); // ADMIN ROUTES

app.use('/api/admin/users', adminRoutes);
app.use('/api/admin/products', productAdminRoutes);
app.use('/api/admin/orders', adminOrderRoutes);
app.listen(PORT, function () {
  console.log("Server is Running on http://localhost:".concat(PORT));
});