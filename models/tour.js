const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const tourSchema = new Schema({
  imgName: String,
  imgPath: String,
  username: String,
  title: String,
  descriptionPreview: String,
  description: String,
  capacity: Number,
  author: { type : Schema.Types.ObjectId, ref: 'User' },
  duration: {
    type: Number,
    min: 1
  },
  rate: Number,
  tourCategory:{
    type: [String],
    enum: ["museum", "culture", "entertainment", "gastronomy", "archeology", "architecture"]
  },
  tourType: {
    type: String,
    enum: ["experience", "groupTour", "walkingTour"]
  }
})

const Tour = mongoose.model("Tour", tourSchema);
module.exports = Tour;

