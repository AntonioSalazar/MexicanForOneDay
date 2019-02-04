const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const experienceSchema = new Schema({
  imgName: String,
  imgPath: String,
  title: String,
  descriptionPreview: String,
  description: String,
  duration: {
    type: Number,
    min: 1
  },
  rate: Number,
  tourCategory:{
    type: [String],
    enum: ["museum", "culture", "entertainment", "gastronomy", "archeology", "architecture"]
  }
}, {collection: "experiences"})

const Experince = mongoose.model("Experience", experienceSchema);
module.exports = Experince;

