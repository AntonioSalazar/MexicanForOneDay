const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const tourSchema = new Schema({
  imgName: String,
  imgPath: String,
  title: String,
  descriptionPreview: String,
  description: String,
  capacity: Number,
  duration: {
    type: Number,
    min: 1
  },
  rate: Number,
  tourCategory:{
    type: [String],
    enum: ["museum", "culture", "entertainment", "gastronomy", "archeology", "architecture"]
  }
})

const Tour = mongoose.model("Tour", tourSchema);
module.exports = Tour;

