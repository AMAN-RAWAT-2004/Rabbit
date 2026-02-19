const express=require('express');
const Order=require('./../Models/Order')
const {
    protect,
    admin
} = require('../Middleware/authMiddleware')
const router = express.Router()

router.get('/',protect,admin,async(req,res)=>{
    try {
        const orders=await Order.find({}).populate("user","name email");
        res.json(orders);
    } catch (error) {
         console.error(error);
         res.status(500).json({message:'Server Error'})
        
    }
})

router.put('/:id/status', protect, admin,async (req, res) => {
    try {
        const { status } = req.body;

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (order.currentStatus === status) {
            return res.status(400).json({
                message: "Order already in this status"
            });
        }

        order.currentStatus = status;
        order.statusHistory.push({ status });

        await order.save(); 

        res.status(200).json(order);

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// router.put('/:id',protect,admin,async(req,res)=>{
//     try {
//         const order=await Order.findById(req.params.id).populate("user","name")
//         if(order){
            
//             order.status=req.body.status || order.status;
//             order.isDelivered=req.body.status==="Delivered"? true : order.isDelivered;
//             order.deliveredAt=req.body.status==="Delivered"? Date.now() : order.deliveredAt;

//             const updatedOrder=await order.save();
//             res.json(updatedOrder)
//         }else{
//             res.status(404).json({messgae:'Order not found'})
//         }
//     } catch (error) {
//         console.error(error);
//          res.status(500).json({message:'Server Error'})
//     }
// })
router.delete('/:id',protect,admin,async(req,res)=>{
    try {
        const order=await Order.findById(req.params.id);
        if(order){
            await order.deleteOne();
            res.json({message:"Order Removed"})
        }else{
            res.status(404).json({message:"Order not found"});
        }
    } catch (error) {
        console.error(error);
         res.status(500).json({message:'Server Error'})
    }
})

module.exports=router;