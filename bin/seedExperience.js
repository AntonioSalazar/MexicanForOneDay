const mongoose = require('mongoose');
const Experience = require('../models/experience');


const dbName = 'mexicanforoneday';
mongoose.connect(`mongodb://localhost/${dbName}`);

const experiences = [
  {
    imgName: "BellasArtes.jpg",
    imgPath: "../images/BellasArtes.jpg",
    title: "Bellas Artes",
    description: "El Palacio de Bellas Artes es un recinto cultural ubicado en el Centro Histórico de la Ciudad de México, considerado el más importante en la manifestación de las artes en México y una de las casas de ópera más renombradas del mundo. ",
    descriptionPreview: "Caminata por el Palacio..",
    duration: 3,
    rate: 8,
    tourCategory: ["museum", "culture"]
},
{
  imgName: "mexicoCity.jpg",
  imgPath: "../images/mexicoCity.jpg",
  title: "Ciudad de Mexico",
  description: "La Ciudad de México, anteriormente conocida como Distrito Federal, ​ es una de las 32 entidades federativas de México, ​​​ así como la capital de los Estados Unidos Mexicanos.",
  descriptionPreview:"La maravillosa Ciudad de Mexico...",
  duration: 8,
  rate: 8,
  tourCategory: ["museum", "culture"]
}
]

Experience.create(experiences, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${experiences.length} experiences`)
  mongoose.connection.close();
})