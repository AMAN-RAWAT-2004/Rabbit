const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config();

const app = express();

const connectDB = require('./Config/db')
const userRoutes = require('./Routes/userRoutes')
const productRoutes = require('./Routes/productRoute')
const cartRoutes = require('./Routes/cartRoute')
const checkoutRoutes = require('./Routes/checkoutRoute')
const orderRoutes = require('./Routes/orderRoutes')
const uploadRoutes = require('./Routes/uploadRoutes')
const subscribeRoutes = require('./Routes/subscribeRoutes')
const adminRoutes = require('./Routes/adminRoutes')
const productAdminRoutes = require('./Routes/productAdminRoutes')
const adminOrderRoutes = require('./Routes/adminOrderRoutes')

connectDB();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 9000;

// CONNECT TO MONGODB


app.get('/', (req, res) => {
    res.send('Welcome to Rabbit Api ')
})

// API ROUTES
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/checkout', checkoutRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api', subscribeRoutes)

// ADMIN ROUTES

app.use('/api/admin/users', adminRoutes)
app.use('/api/admin/products', productAdminRoutes)
app.use('/api/admin/orders', adminOrderRoutes)

app.listen(PORT, () => {
    console.log(`Server is Running on http://localhost:${PORT}`)
})