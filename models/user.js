const mongoose  = require("mongoose");
const Schema    = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  lastname: String,
  userName: {
    type: String,
    required: true,
    unique: true
  },
  email: String,
  age: { 
    type: Number, min: 18
  },
  roles: {
    type: String,
    enum: ["guide", "traveler", "viewer"]
  },
  idFiles: {
    type: [String]
  },
  description: Array,
}, {
  timestamps: { 
    createdAt: "created_at", updatedAt: "updated_at" 
  }

})

const User = mongoose.model("User", userSchema);
module.exports = User;