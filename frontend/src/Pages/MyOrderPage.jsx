import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchUserOrders } from '../redux/Slice/orderSlice'
import { CiSearch } from "react-icons/ci";

const MyOrderPage = () => {

    const [orderValue,setOrderValue]=useState('')
    const navigate=useNavigate()
        const dispatch=useDispatch();
        const {orders,loading,error}=useSelector((state)=>state.orders)

        useEffect(()=>{
            dispatch(fetchUserOrders())
        },[dispatch])

    const handleRowClick=(orderId)=>{
        navigate(`/order/${orderId}`)

    }
      const  handleSubmit=()=>{
                
                 navigate(`/order/${orderValue}`)

    
      }
     
    
    if(loading) return <p>Loading ...</p>
    if(error) return <p>Error: {error}</p>
  return (
    <div className='max-w-7xl mx-auto p-4 sm:p-6'>

<div className="w-full flex justify-center items-center mt-4 mb-4">
  <div className="flex items-center gap-3 bg-white shadow-md px-4 py-2 rounded-lg border border-gray-300 w-full max-w-md">

    
    <label className="font-medium text-gray-700 whitespace-nowrap">
      Search
    </label>

  
    <input
      type="text"
      placeholder="Enter order ID"
      className="flex-1 bg-gray-100 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-500 focus:bg-white transition"
      onChange={(e) => setOrderValue(e.target.value)}
    />

   
    <CiSearch
      onClick={handleSubmit}
      className="text-2xl text-gray-600 cursor-pointer hover:text-black transition"
    />

  </div>
</div>

        <h2 className="text-xl sm:text-2xl font-bold mb-6">
            My Orders
        </h2>
        <div className="relative shadow-md rounded sm:rounded-lg overflow-hidden">
            <table className="min-w-full text-left text-gray-500">
                <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
                    <tr>
                        <th className='py-2 px-4 sm:py-3'>Image</th>
                        <th className='py-2 px-4 sm:py-3'>Order Id</th>
                        <th className='py-2 px-4 sm:py-3'>Created</th>
                        <th className='py-2 px-4 sm:py-3'>Shipping Address</th>
                        <th className='py-2 px-4 sm:py-3'>Items</th>
                        <th className='py-2 px-4 sm:py-3'>Price</th>
                        <th className='py-2 px-4 sm:py-3'>Status</th>
                    </tr>
                </thead>
                <tbody>
                    { 
                     orders.length > 0 ? (
                        orders.map((order)=>(
                            <tr onClick={()=> handleRowClick(order._id)} key={order._id} className='border-b hover:border-gray-50 cursor-pointer'>
                                <td className="py-2 px-2 sm:py-4 sm:px-4">
                                    <img src={order.orderItems[0].image} alt={order.orderItems[0].name} className='h-10 w-10 sm:h-12 sm:w-12 object-cover rounded-lg' />
                                </td>
                                <td className='py-2 px-2 sm:px-4 sm:py-4  text-gray-900 font-medium whitespace-nowrap '>
                                    #{order._id}

                                </td>
                                <td className='py-2 px-2 sm:px-4 sm:py-4'>
                                    {new Date(order.createdAt).toLocaleDateString()}{' '}
                                    {new Date(order.createdAt).toLocaleTimeString()}
                                </td>
                                <td className='py-2 px-2 sm:px-4 sm:py-4'>
                                    {order.shippingAddress ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`:`N/A` }
                                </td>
                                <td className='py-2 px-2 sm:px-4 sm:py-4'>
                                    {order.orderItems.length}
                                </td>
                                <td className='py-2 px-2 sm:px-4 sm:py-4'>
                                    ${order.totalPrice}
                                </td>
                               <td className='py-2 px-2 sm:px-4 sm:py-4'>
                                    <span className={`${order.isPaid ? 'bg-green-100 text-green-700':'bg-red-100 text-red-700'} px-2 py-1 rounded-full text-xs sm:text-sm font-medium`}>
                                        {order.isPaid ? "Paid":"Pending"}
                                    </span>
                                </td>
                            </tr>
                        ))
                    ):(
                        <tr>
                            <td colSpan={7} className="py-4 px-4 text-center text-gray-500">
                                You have no orders
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
      
    </div>
  )
}

export default MyOrderPage
