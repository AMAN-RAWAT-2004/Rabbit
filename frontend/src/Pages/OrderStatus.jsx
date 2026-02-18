import React from "react";
import { MdDone } from "react-icons/md";
const OrderStatus = ({ status }) => {
  const steps = ['Processing','OutforDelivery','Shipped','Delivered','Cancelled'];
  const getIndex=()=>{
     return  steps.findIndex((step)=>step===status);
  }
const currentIndex = getIndex();

 


  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <div className="flex flex-col md:flex-row justify-between items-center px-5 py-5 ">
            {
                steps.map((step,key)=>(
                    <div  className="w-30 md:w-20 flex flex-row md:flex-col justify-between gap-5 md:justify-center items-center md:gap-5 ">
                        <div className="flex flex-col md:flex-row justify-center items-center">
                            <div key={key}  className={`border-4 h-10 md:h-0 md:w-20 z-0 ${key <= currentIndex ?'border-green-400':'border-red-400'}`}>

                            </div>
                            <div key={key}  className={`h-11 flex justify-center items-center w-11 rounded-full  ${key <= currentIndex ?'bg-green-400':'bg-red-400'}`}>
                           {key <= currentIndex ? <MdDone /> : key + 1}

                        </div>
                        </div>
                        
                        <p className="font-bold text-center ">
                            {step}
                        </p>
                    </div>
                ))
            }
        </div>
    </div>
  );
};




export default OrderStatus
