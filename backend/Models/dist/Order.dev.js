"use strict";

var mongoose = require('mongoose');

var orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  size: String,
  color: String,
  quantity: {
    type: Number,
    required: true
  }
}, {
  _id: false
});
var orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderItems: [orderItemSchema],
  shippingAddress: {
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    postalCode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    }
  },
  paymentMethod: {
    type: String,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  isPaid: {
    type: Boolean,
    "default": false
  },
  paidAt: {
    type: Date
  },
  isDelivered: {
    type: Boolean,
    "default": false
  },
  deliveredAt: {
    type: Date
  },
  paymentStatus: {
    type: String,
    "default": 'pending'
  },
  statusHistory: [{
    status: {
      type: String,
      "enum": ['Processing', 'OutForDelivery', 'Shipped', 'Delivered', 'Cancelled'],
      required: true
    },
    updatedAt: {
      type: Date,
      "default": Date.now
    }
  }],
  currentStatus: {
    type: String,
    "enum": ['Processing', 'OutForDelivery', 'Shipped', 'Delivered', 'Cancelled'],
    "default": 'Processing'
  }
}, {
  timestamps: true
});
orderSchema.pre('save', function () {
  if (this.isNew) {
    this.statusHistory.push({
      status: this.currentStatus
    });
  }
});
module.exports = mongoose.model('order', orderSchema);