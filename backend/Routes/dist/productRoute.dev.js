"use strict";

var express = require('express');

var Product = require('../Models/product');

var _require = require('../Middleware/authMiddleware'),
    protect = _require.protect,
    admin = _require.admin;

var router = express.Router();
router.post('/', protect, admin, function _callee(req, res, next) {
  var _req$body, name, description, price, discountPrice, countInStock, category, brand, sizes, colors, collections, material, gender, images, isFeatured, isPublished, tags, dimensions, weight, sku, product, createdProduct;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, name = _req$body.name, description = _req$body.description, price = _req$body.price, discountPrice = _req$body.discountPrice, countInStock = _req$body.countInStock, category = _req$body.category, brand = _req$body.brand, sizes = _req$body.sizes, colors = _req$body.colors, collections = _req$body.collections, material = _req$body.material, gender = _req$body.gender, images = _req$body.images, isFeatured = _req$body.isFeatured, isPublished = _req$body.isPublished, tags = _req$body.tags, dimensions = _req$body.dimensions, weight = _req$body.weight, sku = _req$body.sku;
          product = new Product({
            name: name,
            description: description,
            price: price,
            discountPrice: discountPrice,
            countInStock: countInStock,
            category: category,
            brand: brand,
            sizes: sizes,
            colors: colors,
            collections: collections,
            material: material,
            gender: gender,
            images: images,
            isFeatured: isFeatured,
            isPublished: isPublished,
            tags: tags,
            dimensions: dimensions,
            weight: weight,
            sku: sku,
            user: req.user._id
          });
          _context.next = 5;
          return regeneratorRuntime.awrap(product.save());

        case 5:
          createdProduct = _context.sent;
          res.status(201).json(createdProduct);
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.status(500).send('Server Error');

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
router.put('/:id', protect, admin, function _callee2(req, res) {
  var _req$body2, name, description, price, discountPrice, countInStock, category, brand, sizes, colors, collections, material, gender, images, isFeatured, isPublished, tags, dimensions, weight, sku, product, updateProduct;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body2 = req.body, name = _req$body2.name, description = _req$body2.description, price = _req$body2.price, discountPrice = _req$body2.discountPrice, countInStock = _req$body2.countInStock, category = _req$body2.category, brand = _req$body2.brand, sizes = _req$body2.sizes, colors = _req$body2.colors, collections = _req$body2.collections, material = _req$body2.material, gender = _req$body2.gender, images = _req$body2.images, isFeatured = _req$body2.isFeatured, isPublished = _req$body2.isPublished, tags = _req$body2.tags, dimensions = _req$body2.dimensions, weight = _req$body2.weight, sku = _req$body2.sku;
          _context2.next = 4;
          return regeneratorRuntime.awrap(Product.findById(req.params.id));

        case 4:
          product = _context2.sent;

          if (!product) {
            _context2.next = 31;
            break;
          }

          product.name = name || product.name;
          product.description = description || product.description;
          product.price = price || product.price;
          product.discountPrice = discountPrice || product.discountPrice;
          product.countInStock = countInStock || product.countInStock;
          product.category = category || product.category;
          product.brand = brand || product.brand;
          product.sizes = sizes || product.sizes;
          product.colors = colors || product.colors;
          product.collections = collections || product.collections;
          product.material = material || product.material;
          product.gender = gender || product.gender;
          product.images = images || product.images;
          product.isFeatured = isFeatured !== undefined || product.isFeatured;
          product.isPublished = isPublished !== undefined || product.isPublished;
          product.tags = tags || product.tags;
          product.dimensions = dimensions || product.dimensions;
          product.weight = weight || product.weight;
          product.sku = sku || product.sku;
          _context2.next = 27;
          return regeneratorRuntime.awrap(product.save());

        case 27:
          updateProduct = _context2.sent;
          // console.log(updateProduct);
          res.json(updateProduct);
          _context2.next = 32;
          break;

        case 31:
          res.status(404).json({
            message: 'Product not Found'
          });

        case 32:
          _context2.next = 38;
          break;

        case 34:
          _context2.prev = 34;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          res.status(500).send('Server Error');

        case 38:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 34]]);
});
router["delete"]('/:id', protect, admin, function _callee3(req, res) {
  var product;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Product.findById(req.params.id));

        case 3:
          product = _context3.sent;

          if (!product) {
            _context3.next = 10;
            break;
          }

          _context3.next = 7;
          return regeneratorRuntime.awrap(product.deleteOne());

        case 7:
          res.json({
            message: 'Product got removed'
          });
          _context3.next = 11;
          break;

        case 10:
          res.status(404).json({
            message: 'Product not found'
          });

        case 11:
          _context3.next = 17;
          break;

        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          res.status(500).send('Server Error');

        case 17:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 13]]);
});
router.get('/', function _callee4(req, res) {
  var _req$query, collection, size, color, gender, minPrice, maxPrice, sortBy, search, category, material, brand, limit, query, sort, products;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _req$query = req.query, collection = _req$query.collection, size = _req$query.size, color = _req$query.color, gender = _req$query.gender, minPrice = _req$query.minPrice, maxPrice = _req$query.maxPrice, sortBy = _req$query.sortBy, search = _req$query.search, category = _req$query.category, material = _req$query.material, brand = _req$query.brand, limit = _req$query.limit;
          query = {};

          if (collection && collection.toLocaleLowerCase() !== "all") {
            query.collections = collection;
          }

          if (category && category.toLocaleLowerCase() !== "all") {
            query.category = category;
          }

          if (material) {
            query.material = {
              $in: material.split(',')
            };
          }

          if (brand) {
            query.brand = {
              $in: brand.split(',')
            };
          }

          if (size) {
            query.sizes = {
              $in: size.split(',')
            };
          }

          if (color) {
            query.colors = {
              $in: [color]
            };
          }

          if (gender) {
            query.gender = gender;
          }

          if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
          }

          if (search) {
            query.$or = [{
              name: {
                $regex: search,
                $options: 'i'
              }
            }, {
              description: {
                $regex: search,
                $options: 'i'
              }
            }];
          }

          sort = {};

          if (!sortBy) {
            _context4.next = 24;
            break;
          }

          _context4.t0 = sortBy;
          _context4.next = _context4.t0 === 'priceAsc' ? 17 : _context4.t0 === 'priceDesc' ? 19 : _context4.t0 === 'popularity' ? 21 : 23;
          break;

        case 17:
          sort = {
            price: 1
          };
          return _context4.abrupt("break", 24);

        case 19:
          sort = {
            price: -1
          };
          return _context4.abrupt("break", 24);

        case 21:
          sort = {
            rating: -1
          };
          return _context4.abrupt("break", 24);

        case 23:
          return _context4.abrupt("break", 24);

        case 24:
          _context4.next = 26;
          return regeneratorRuntime.awrap(Product.find(query).sort(sort).limit(Number(limit) || 0));

        case 26:
          products = _context4.sent;
          res.json({
            totalProducts: products.length,
            products: products
          });
          _context4.next = 34;
          break;

        case 30:
          _context4.prev = 30;
          _context4.t1 = _context4["catch"](0);
          console.error(_context4.t1);
          res.status(500).send('Server Error');

        case 34:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 30]]);
});
router.get('/best-seller', function _callee5(req, res) {
  var bestSeller;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Product.findOne().sort({
            rating: -1
          }));

        case 3:
          bestSeller = _context5.sent;

          if (bestSeller) {
            res.json(bestSeller);
          } else {
            res.status(404).json({
              message: 'No Bestseller Found'
            });
          }

          _context5.next = 11;
          break;

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          console.error(_context5.t0);
          res.status(500).send('Server Error');

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.get('/new-arrivals', function _callee6(req, res) {
  var newArrivals;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(Product.find().sort({
            createdAt: -1
          }).limit(8));

        case 3:
          newArrivals = _context6.sent;
          res.json(newArrivals);
          _context6.next = 11;
          break;

        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          console.error(_context6.t0);
          res.status(500).send('Server Error');

        case 11:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.get('/:id', function _callee7(req, res) {
  var product;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(Product.findById(req.params.id));

        case 3:
          product = _context7.sent;

          if (product) {
            res.json(product);
          } else {
            res.status(404).json({
              message: 'Product Not Found'
            });
          }

          _context7.next = 11;
          break;

        case 7:
          _context7.prev = 7;
          _context7.t0 = _context7["catch"](0);
          console.error(_context7.t0);
          res.status(500).send('Server Error');

        case 11:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.get('/similar/:id', function _callee8(req, res) {
  var id, product, similarProducts;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          id = req.params.id;
          _context8.prev = 1;
          _context8.next = 4;
          return regeneratorRuntime.awrap(Product.findById(id));

        case 4:
          product = _context8.sent;

          if (product) {
            _context8.next = 7;
            break;
          }

          return _context8.abrupt("return", res.status(404).json({
            message: 'Product not found'
          }));

        case 7:
          _context8.next = 9;
          return regeneratorRuntime.awrap(Product.find({
            _id: {
              $ne: id
            },
            gender: product.gender,
            category: product.category
          }).limit(4));

        case 9:
          similarProducts = _context8.sent;
          res.json(similarProducts);
          _context8.next = 17;
          break;

        case 13:
          _context8.prev = 13;
          _context8.t0 = _context8["catch"](1);
          console.error(_context8.t0);
          res.status(500).send('Server Error');

        case 17:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[1, 13]]);
});
module.exports = router;