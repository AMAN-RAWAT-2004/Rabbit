import React from "react";
import { MdDone } from "react-icons/md";

const OrderStatus = ({ currentStatus, history = [] }) => {

  const steps = [
    "Processing",
    "Shipped",
    "OutForDelivery",
    "Delivered",
    "Cancelled"
  ];

  const currentIndex = steps.findIndex(
    (step) => step === currentStatus
  );

  const getDate = (stepName) => {
    const found = history.find(h => h.status === stepName);
    return found
      ? new Date(found.updatedAt).toLocaleString()
      : "";
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6">
      <div className="flex flex-col md:flex-row justify-between items-center">

        {steps.map((step, index) => {
          const completed = index <= currentIndex;
          const date = getDate(step);

          return (
            <div
              key={step}
              className="flex flex-col items-center justify-center  relative min-h-32"
            >

              {/* Line */}
              {index !== steps.length - 1 && (
                <div
                  className={`hidden md:block absolute top-5 left-1/2 w-30 h-1
                  ${completed ? "bg-green-400" : "bg-gray-300"}`}
                />
              )}

              {/* Circle */}
              <div
                className={`z-10 h-11 w-11 flex justify-center items-center 
                rounded-full text-white font-bold transition-colors duration-300
                ${completed ? "bg-green-400" : "bg-gray-400"}`}
              >
                {completed ? <MdDone /> : index + 1}
              </div>

              {/* Step Name */}
              <p className="font-bold text-center mt-3">
                {step}
              </p>

              {/* Date (fixed height to prevent jump) */}
              <p className="text-xs text-gray-500 text-center mt-1 min-h-32">
                {date}
              </p>

            </div>
          );
        })}

      </div>
    </div>
  );
};

export default OrderStatus;
