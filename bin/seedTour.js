const mongoose = require('mongoose');
const Tour = require('../models/tour');


const dbName = 'mexicanforoneday';
mongoose.connect(`mongodb://localhost/${dbName}`);

const tours = [
  {
    imgName: "groupTour1.jpg",
    imgPath: "../images/groupTour1.jpg",
    title: "Piramides!",
    descriptionPreview: "Las piramides fueron algo...",
    description: "Las piramides estan muy grandotas y estan muy bonitas",
    capacity: 8,
    duration: 9,
    rate: 8,
    tourCategory: ["museum", "culture"]
},
{
  imgName: "group2.jpg",
  imgPath: "../images/groupTour2.jpg",
  title: "Las Trajineras",
  descriptionPreview: "Se encuentran al sur...",
  description: "Las trajineras estan al sur en Xochimilco",
  capacity: 15,
  duration: 8,
  rate: 8,
  tourCategory: ["museum", "culture"]
}
]

Tour.create(tours, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${tours.length}  tours in db`)
  mongoose.connection.close();
});