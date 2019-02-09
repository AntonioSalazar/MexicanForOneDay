const mongoose = require('mongoose');
const Tour = require('../models/tour');


const dbName = 'mexicanforoneday';
mongoose.connect(`mongodb://localhost/${dbName}`);

const tours = [
  {
    imgName: "piramidesTeotihuacan.jpg",
    imgPath: "../images/piramidesTeotihuacan.jpg",
    username: "Antonio Salazar",
    title: "PIRÁMIDES TEOTIHUACÁN",
    descriptionPreview: "Teotihuacán es un amplio complejo arqueológico",
    description: "Excursión a las pirámides de Teotihuacan con salida a primera hora de la mañana y un arqueólogo privado. Visita organizada con transporte desde la mayoría de los hoteles de Ciudad de México. Apúntate a la excursión más interesante que puedes hacer desde Ciudad de México. Un viaje a la Ciudad de los Dioses, que conserva los vestigios de una de las civilizaciones más importantes de Mesoamérica, al mejor precio y con operadores locales de confianza. Ofrecemos los mejores precios sin competencia y excursiones interesantes bien planificadas y llevadas a cabo por expertos de la zona.",
    capacity: 8,
    duration: 9,
    rate: 8,
    tourCategory: ["museum", "culture"],
    tourType: "groupTour"
},
{
  imgName: "museoAntropologia.jpg",
  imgPath: "../images/museoAntropologia.jpg",
  username: "Paola Mejia",
  title: "Museo Nacional de Antropología",
  descriptionPreview: "Uno de los recintos museográficos más importantes de México y de América.",
  description: "Un museo que representa gran parte de la historia de la humanidad. Un gran museo de Paseo de la Reforma en Ciudad de México. Sin costo los domingos. Digno de conocerlo y visitar todas sus salas donde se observan las etapas de crecimiento del ser humano. Muy bien cuidado y con gran variedad de aspectos a conocer.",
  capacity: 1,
  duration: 3,
  rate: 8,
  tourCategory: ["museum", "culture"],
  tourType: "experience"
}
]

Tour.create(tours, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${tours.length}  tours in db`)
  mongoose.connection.close();
});