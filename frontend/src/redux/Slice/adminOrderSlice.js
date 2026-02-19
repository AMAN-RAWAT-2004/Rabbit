import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";



// ASYNCTHUNK TO FETCH All orders 

export const fetchAllOrders=createAsyncThunk('adminOrders/fetchAllOrders',async(_,{rejectWithValue})=>{
    try {
        const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`,
            {
                headers:{
            Authorization:`Bearer ${localStorage.getItem('userToken')}`
                }
        })
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

// ASYNCTHUNK FOR UPDATE ORDER STATUS
export const updateOrderStatus = createAsyncThunk(
  'adminOrders/updateOrderStatus',
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${orderId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
          }
        }
      );

      return response.data;

    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);


// ASYNCTHUNK TO update delivery status of the orders 

export const deleteOrder=createAsyncThunk('adminOrders/deleteOrder',async({id},{rejectWithValue})=>{
    try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`, {
                headers:{
            Authorization:`Bearer ${localStorage.getItem('userToken')}`
                }
        })
        return id;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

const adminOrderSlice=createSlice({
    name:"adminOrders",
    initialState:{
        orders:[],
        totalOrders:0,
        totalSales:0,
        loading:false,
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchAllOrders.pending,(state)=>{
            state.loading=true;
            state.error=null;
        }).addCase(fetchAllOrders.fulfilled,(state,action)=>{
            state.loading=false;
            state.orders=action.payload;
            state.totalOrders=action.payload.length;
            const totalSales=action.payload.reduce((acc,order)=>{
                return acc + order.totalPrice;
            },0)
            state.totalSales=totalSales;
        }).addCase(fetchAllOrders.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload.message;
        }).addCase(updateOrderStatus.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(updateOrderStatus.fulfilled, (state, action) => {
  state.loading = false;

  const updatedOrder = action.payload;

  const index = state.orders.findIndex(
    order => order._id === updatedOrder._id
  );

  if (index !== -1) {
    state.orders[index] = updatedOrder;
  }
})
.addCase(updateOrderStatus.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload?.message;
})
.addCase(deleteOrder.fulfilled,(state,action)=>{
            state.orders=state.orders.filter((order)=>order._id!==action.payload)
        })
    }

})

export default adminOrderSlice.reducer;