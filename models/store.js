const mongoose = require('mongoose');

const StoreShema = new mongoose.Schema({
    storeId: {
        type: String,
        required: [true, 'please add storeId'],
        unique: true,
        trim: true,
        maxlength: [10, 'Store ID must be less than 10 chars']
    },
    address: {
      type: String,
      required: [true, 'Please add address']
    },
    location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.export = mongoose.model('Store', StoreShema)