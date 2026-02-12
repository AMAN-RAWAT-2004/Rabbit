"use strict";

var express = require('express');

var Cart = require('../Models/Cart');

var Product = require('../Models/product');

var _require = require('../Middleware/authMiddleware'),
    protect = _require.protect,
    admin = _require.admin;

var user = require('../Models/user');

var router = express.Router();

var getCart = function getCart(userId, guestId) {
  return regeneratorRuntime.async(function getCart$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!userId) {
            _context.next = 6;
            break;
          }

          _context.next = 3;
          return regeneratorRuntime.awrap(Cart.findOne({
            user: userId
          }));

        case 3:
          return _context.abrupt("return", _context.sent);

        case 6:
          if (!guestId) {
            _context.next = 10;
            break;
          }

          _context.next = 9;
          return regeneratorRuntime.awrap(Cart.findOne({
            guestId: guestId
          }));

        case 9:
          return _context.abrupt("return", _context.sent);

        case 10:
          return _context.abrupt("return", null);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
};

router.post('/', function _callee(req, res) {
  var _req$body, productId, quantity, size, color, guestId, userId, product, cart, productIndex, newCart;

  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, productId = _req$body.productId, quantity = _req$body.quantity, size = _req$body.size, color = _req$body.color, guestId = _req$body.guestId, userId = _req$body.userId;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(Product.findById(productId));

        case 4:
          product = _context2.sent;

          if (product) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(404).status({
            message: 'Product not found!!'
          }));

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(getCart(userId, guestId));

        case 9:
          cart = _context2.sent;

          if (!cart) {
            _context2.next = 19;
            break;
          }

          productIndex = cart.products.findIndex(function (p) {
            return p.productId.toString() === productId && p.size === size && p.color === color;
          });

          if (productIndex > -1) {
            cart.products[productIndex].quantity += quantity;
          } else {
            cart.products.push({
              productId: productId,
              name: product.name,
              image: product.images[0].url,
              price: product.price,
              size: size,
              color: color,
              quantity: quantity
            });
          }

          cart.totalPrice = cart.products.reduce(function (acc, item) {
            return acc + item.price * item.quantity;
          }, 0);
          _context2.next = 16;
          return regeneratorRuntime.awrap(cart.save());

        case 16:
          return _context2.abrupt("return", res.status(200).json(cart));

        case 19:
          _context2.next = 21;
          return regeneratorRuntime.awrap(Cart.create({
            user: userId ? userId : undefined,
            guestId: guestId ? guestId : 'guest_' + new Date().getTime(),
            products: [{
              productId: productId,
              name: product.name,
              image: product.images[0].url,
              price: product.price,
              size: size,
              color: color,
              quantity: quantity
            }],
            totalPrice: product.price * quantity
          }));

        case 21:
          newCart = _context2.sent;
          return _context2.abrupt("return", res.status(201).json(newCart));

        case 23:
          _context2.next = 29;
          break;

        case 25:
          _context2.prev = 25;
          _context2.t0 = _context2["catch"](1);
          console.log(_context2.t0);
          res.status(500).json({
            message: 'Server Error'
          });

        case 29:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 25]]);
});
router.put('/', function _callee2(req, res) {
  var _req$body2, productId, quantity, guestId, userId, size, color, cart, productIndex;

  return regeneratorRuntime.async(function _callee2$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body2 = req.body, productId = _req$body2.productId, quantity = _req$body2.quantity, guestId = _req$body2.guestId, userId = _req$body2.userId, size = _req$body2.size, color = _req$body2.color;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(getCart(userId, guestId));

        case 4:
          cart = _context3.sent;

          if (cart) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            message: 'Cart not found'
          }));

        case 7:
          productIndex = cart.products.findIndex(function (p) {
            return p.productId.toString() === productId && p.size === size && p.color === color;
          });

          if (!(productIndex > -1)) {
            _context3.next = 16;
            break;
          }

          if (quantity > 0) {
            cart.products[productIndex].quantity = quantity;
          } else {
            cart.products.splice(productIndex, 1);
          }

          cart.totalPrice = cart.products.reduce(function (acc, item) {
            return acc + item.price * item.quantity;
          }, 0);
          _context3.next = 13;
          return regeneratorRuntime.awrap(cart.save());

        case 13:
          return _context3.abrupt("return", res.status(200).json(cart));

        case 16:
          return _context3.abrupt("return", res.status(404).json({
            message: 'Product Not Found in the Cart'
          }));

        case 17:
          _context3.next = 23;
          break;

        case 19:
          _context3.prev = 19;
          _context3.t0 = _context3["catch"](1);
          console.log(_context3.t0);
          res.status(500).json({
            message: 'Server Error'
          });

        case 23:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 19]]);
});
router["delete"]('/', function _callee3(req, res) {
  var _req$body3, productId, size, color, guestId, userId, cart, productIndex;

  return regeneratorRuntime.async(function _callee3$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body3 = req.body, productId = _req$body3.productId, size = _req$body3.size, color = _req$body3.color, guestId = _req$body3.guestId, userId = _req$body3.userId;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(getCart(userId, guestId));

        case 4:
          cart = _context4.sent;

          if (cart) {
            _context4.next = 7;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            message: 'Cart not found'
          }));

        case 7:
          productIndex = cart.products.findIndex(function (p) {
            return p.productId.toString() === productId && p.size === size && p.color === color;
          });

          if (!(productIndex > -1)) {
            _context4.next = 16;
            break;
          }

          cart.products.splice(productIndex, 1);
          cart.totalPrice = cart.products.reduce(function (acc, item) {
            return acc + item.price * item.quantity;
          }, 0);
          _context4.next = 13;
          return regeneratorRuntime.awrap(cart.save());

        case 13:
          return _context4.abrupt("return", res.status(200).json(cart));

        case 16:
          return _context4.abrupt("return", res.status(404).json({
            message: 'Product Not Found in the Cart'
          }));

        case 17:
          _context4.next = 23;
          break;

        case 19:
          _context4.prev = 19;
          _context4.t0 = _context4["catch"](1);
          console.log(_context4.t0);
          res.status(500).json({
            message: 'Server Error'
          });

        case 23:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 19]]);
});
router.get('/', function _callee4(req, res) {
  var _req$query, userId, guestId, cart;

  return regeneratorRuntime.async(function _callee4$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _req$query = req.query, userId = _req$query.userId, guestId = _req$query.guestId;
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(getCart(userId, guestId));

        case 4:
          cart = _context5.sent;

          if (!cart) {
            _context5.next = 9;
            break;
          }

          res.json(cart);
          _context5.next = 10;
          break;

        case 9:
          return _context5.abrupt("return", res.status(404).json({
            message: 'Cart not found'
          }));

        case 10:
          _context5.next = 16;
          break;

        case 12:
          _context5.prev = 12;
          _context5.t0 = _context5["catch"](1);
          console.log(_context5.t0);
          res.status(500).json({
            message: 'Server Error'
          });

        case 16:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 12]]);
}); // route POST/api/cart/merge
// desc Merge Guest Cart into user Cart on Login
// access Private

router.post('/merge', protect, function _callee5(req, res) {
  var guestId, guestCart, userCart;
  return regeneratorRuntime.async(function _callee5$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          guestId = req.body.guestId;
          _context6.prev = 1;
          _context6.next = 4;
          return regeneratorRuntime.awrap(Cart.findOne({
            guestId: guestId
          }));

        case 4:
          guestCart = _context6.sent;
          _context6.next = 7;
          return regeneratorRuntime.awrap(Cart.findOne({
            user: req.user._id
          }));

        case 7:
          userCart = _context6.sent;

          if (!guestCart) {
            _context6.next = 34;
            break;
          }

          if (!(guestCart.products.length === 0)) {
            _context6.next = 11;
            break;
          }

          return _context6.abrupt("return", res.status(400).json({
            message: 'Guest Cart is Empty'
          }));

        case 11:
          if (!userCart) {
            _context6.next = 27;
            break;
          }

          guestCart.products.forEach(function (guestItem) {
            var productIndex = userCart.products.findIndex(function (item) {
              item.productId.toString() === guestItem.productId.toString() && item.size === guestItem.size && item.color === guestItem.color;
            });

            if (productIndex > -1) {
              userCart.product[productIndex].quantity += guestItem.quantity;
            } else {
              userCart.products.push(guestItem);
            }
          });
          userCart.totalPrice = userCart.products.reduce(function (acc, item) {
            return acc + item.price * item.quantity;
          }, 0);
          _context6.next = 16;
          return regeneratorRuntime.awrap(userCart.save());

        case 16:
          _context6.prev = 16;
          _context6.next = 19;
          return regeneratorRuntime.awrap(Cart.findOneAndDelete({
            guestId: guestId
          }));

        case 19:
          _context6.next = 24;
          break;

        case 21:
          _context6.prev = 21;
          _context6.t0 = _context6["catch"](16);
          console.error('Error deleting guest cart', _context6.t0);

        case 24:
          res.status(200).json(userCart);
          _context6.next = 32;
          break;

        case 27:
          guestCart.user = req.user._id;
          guestCart.guestId = undefined;
          _context6.next = 31;
          return regeneratorRuntime.awrap(guestCart.save());

        case 31:
          res.status(200).json(guestCart);

        case 32:
          _context6.next = 37;
          break;

        case 34:
          if (!userCart) {
            _context6.next = 36;
            break;
          }

          return _context6.abrupt("return", res.status(200).json(userCart));

        case 36:
          res.status(404).json({
            message: 'GuestCart is Not Found'
          });

        case 37:
          _context6.next = 43;
          break;

        case 39:
          _context6.prev = 39;
          _context6.t1 = _context6["catch"](1);
          console.log(_context6.t1);
          res.status(500).json({
            message: 'Server Error'
          });

        case 43:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[1, 39], [16, 21]]);
});
module.exports = router;