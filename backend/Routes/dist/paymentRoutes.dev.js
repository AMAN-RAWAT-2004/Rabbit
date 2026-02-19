"use strict";

var express = require("express");

var Razorpay = require("razorpay");

var crypto = require("crypto");

var Order = require("../Models/Order");

var _require = require("../Middleware/authMiddleware"),
    admin = _require.admin,
    protect = _require.protect;

var _require2 = require("console"),
    log = _require2.log;

var router = express.Router(); // Initialize Razorpay

var razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET
});
/* ============================
   1️⃣ CREATE RAZORPAY ORDER
============================= */

router.post("/razorpay/create", function _callee(req, res) {
  var orderId, order, options, razorpayOrder;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          orderId = req.body.orderId;
          console.log(orderId);
          _context.next = 5;
          return regeneratorRuntime.awrap(Order.findById(orderId));

        case 5:
          order = _context.sent;
          console.log();

          if (order) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", res.status(404).json({
            message: "Order not found"
          }));

        case 9:
          options = {
            amount: order.totalPrice * 100,
            // convert to paise
            currency: "INR",
            receipt: "receipt_".concat(order._id)
          };
          _context.next = 12;
          return regeneratorRuntime.awrap(razorpay.orders.create(options));

        case 12:
          razorpayOrder = _context.sent;
          res.status(200).json({
            key: process.env.RAZORPAY_KEY_ID,
            orderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency
          });
          _context.next = 19;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            message: _context.t0.message
          });

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 16]]);
});
/* ============================
   2️⃣ VERIFY PAYMENT
============================= */

router.post("/razorpay/verify", function _callee2(req, res) {
  var _req$body, razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId, body, expectedSignature;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body = req.body, razorpay_order_id = _req$body.razorpay_order_id, razorpay_payment_id = _req$body.razorpay_payment_id, razorpay_signature = _req$body.razorpay_signature, orderId = _req$body.orderId;
          body = razorpay_order_id + "|" + razorpay_payment_id;
          expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(body).digest("hex");

          if (!(expectedSignature !== razorpay_signature)) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            success: false
          }));

        case 6:
          _context2.next = 8;
          return regeneratorRuntime.awrap(Order.findByIdAndUpdate(orderId, {
            isPaid: true,
            paidAt: Date.now(),
            paymentResult: {
              razorpay_order_id: razorpay_order_id,
              razorpay_payment_id: razorpay_payment_id
            }
          }));

        case 8:
          res.json({
            success: true
          });
          _context2.next = 14;
          break;

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            message: _context2.t0.message
          });

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 11]]);
});
module.exports = router;