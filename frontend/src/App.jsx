import { BrowserRouter,Route,Routes } from 'react-router-dom'
import './App.css'
import UserLayout from './Components/Layout/UserLayout'
import Home from './Pages/Home'
import {Toaster} from 'sonner'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Profile from './Pages/Profile'
import CollectionPage from './Pages/CollectionPage'
import ProductDetails from './Components/Products/ProductDetails'
import Checkout from './Components/Cart/Checkout'
import OrderConfirmationPage from './Pages/OrderConfirmationPage'
import OrderDetailsPage from './Pages/OrderDetailsPage'
import MyOrderPage from './Pages/MyOrderPage'
import AdminLayout from './Components/Admin/AdminLayout'
import AdminHomePage from './Pages/AdminHomePage'
import UserManagment from './Components/Admin/UserManagment'
import ProductManagment from './Pages/ProductManagment'
import EditProductPage from './Components/Admin/EditProductPage'
import OrderManagment from './Components/Admin/OrderManagment'
import {Provider} from "react-redux";
import store from "./redux/store"
import ProtectedRoute from './Components/Common/ProtectedRoute'
function App() {


  return (
    <Provider store={store}>
    <BrowserRouter>
      <Toaster position='top-right'/>
    <Routes>
      <Route path='/' element={<UserLayout/>} >
      {/*User Layout*/}
      <Route index element={<Home/>}/>
      <Route path='login'element={<Login/>}/>
      <Route path='register'element={<Register/>}/>
      <Route path='profile'element={<Profile/>}/>
      <Route path='collections/:collection' element={<CollectionPage/>}/>
      <Route path='products/:id' element={<ProductDetails/>}/>
      <Route path='checkout' element={<Checkout/>}/>
      <Route path='order-confirmation' element={<OrderConfirmationPage/>}/>
      <Route path='order/:id' element={<OrderDetailsPage/>}/>
      <Route path='my-orders' element={<MyOrderPage/>}/>
      </Route>
      <Route path='/admin' element={
        <ProtectedRoute role="admin">
        <AdminLayout/>    {/*Admin Layout*/}
      </ProtectedRoute>
    }>
      <Route index element={<AdminHomePage/>}/>
      <Route path='users' element={<UserManagment/>} />
      <Route path='products' element={<ProductManagment/>} />
      <Route path='products/:id/edit' element={<EditProductPage/>} />
      <Route path='orders' element={<OrderManagment/>} />

      </Route>
    </Routes>
    </BrowserRouter>
    </Provider>
  )
}

export default App
