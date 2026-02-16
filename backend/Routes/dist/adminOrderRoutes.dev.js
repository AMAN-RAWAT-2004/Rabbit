"use strict";

var express = require('express');

var Order = require('./../Models/Order');

var _require = require('../Middleware/authMiddleware'),
    protect = _require.protect,
    admin = _require.admin;

var router = express.Router();
router.get('/', protect, admin, function _callee(req, res) {
  var orders;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Order.find({}).populate("user", "name email"));

        case 3:
          orders = _context.sent;
          res.json(orders);
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          res.status(500).json({
            message: 'Server Error'
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.put('/:id', protect, admin, function _callee2(req, res) {
  var order, updatedOrder;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Order.findById(req.params.id).populate("user", "name"));

        case 3:
          order = _context2.sent;

          if (!order) {
            _context2.next = 14;
            break;
          }

          order.status = req.body.status || order.status;
          order.isDelivered = req.body.status === "Delivered" ? true : order.isDelivered;
          order.deliveredAt = req.body.status === "Delivered" ? Date.now() : order.deliveredAt;
          _context2.next = 10;
          return regeneratorRuntime.awrap(order.save());

        case 10:
          updatedOrder = _context2.sent;
          res.json(updatedOrder);
          _context2.next = 15;
          break;

        case 14:
          res.status(404).json({
            messgae: 'Order not found'
          });

        case 15:
          _context2.next = 21;
          break;

        case 17:
          _context2.prev = 17;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          res.status(500).json({
            message: 'Server Error'
          });

        case 21:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 17]]);
});
router["delete"]('/:id', protect, admin, function _callee3(req, res) {
  var order;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Order.findById(req.params.id));

        case 3:
          order = _context3.sent;

          if (!order) {
            _context3.next = 10;
            break;
          }

          _context3.next = 7;
          return regeneratorRuntime.awrap(order.deleteOne());

        case 7:
          res.json({
            message: "Order Removed"
          });
          _context3.next = 11;
          break;

        case 10:
          res.status(404).json({
            message: "Order not found"
          });

        case 11:
          _context3.next = 17;
          break;

        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          res.status(500).json({
            message: 'Server Error'
          });

        case 17:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 13]]);
});
module.exports = router;