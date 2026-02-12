import {configureStore} from  "@reduxjs/toolkit"
import authReducer from './Slice/authSlice'
import productReducer from './Slice/productsSlice'
import cartReducer from './Slice/cartSlice'
import checkoutReducer from './Slice/checkoutSlice'
import orderReducer from './Slice/orderSlice'
import adminReducer from './Slice/adminSlice'
import adminProductReducer from './Slice/adminProductSlice'
import adminOrderReducer from './Slice/adminOrderSlice'
const store=configureStore({
    reducer:{
        auth:authReducer,
        products:productReducer,
        cart:cartReducer,
        checkout:checkoutReducer,
        orders:orderReducer,
        admin:adminReducer,
        adminProducts:adminProductReducer,
        adminOrders:adminOrderReducer,
    },
})

export default store;