const mongoose = require('mongoose');

const detailsSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  phoneNumber: { 
    type: Number,
    validate: {
      validator: function(v) {
        return /^\d{10,15}$/.test(v.toString());
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  country: String,
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other']
  }
}, { timestamps: true });

module.exports = mongoose.model('Details', detailsSchema);