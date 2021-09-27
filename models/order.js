const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: true,
    },
    PatientName: {
        type: String,
        required: true,
    },
    PatientAge: {
        type: String,
        required: true,
    },
    DeliveryLocation: {
        type: String,
        required: true,
    },
    Alergic: {
        type: String,
        required: true,
    },
    Gender: {
        type: String,
        required: true,
    },
    ContactNo: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

module.exports = mongoose.model('Order', orderSchema);
