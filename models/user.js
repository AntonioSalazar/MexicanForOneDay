const mongoose  = require("mongoose");
const Schema    = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  roles: {
    type: String,
    enum: ["GUEST", "ADMIN", "EDITOR"],
    default: "GUEST"
  },
  imgName: String,
  imgPath: {
    type: String,
    default: "../images/user_icon.png"
  },
  description: String,
}, 
{
  timestamps: { 
    createdAt: "created_at", updatedAt: "updated_at" 
  }

})

const User = mongoose.model("User", userSchema);
module.exports = User;