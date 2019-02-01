// window.onload = ()=>{
//   let image = document.getElementById("image");
//   var imgurl;
//   image.addEventListener("input", ()=>{
//     console.log(image.files[0]);
//     const files = image.files;
//     const data = new FormData();
//     data.append("file", files[0])
//     data.append("upload_preset", "projectimages")

//     fetch('https://api.cloudinary.com/v1_1/antoniose/image/upload', {
//       method: "POST",
//       body: data
//     })
//     .then(res =>res.json())
//     .then(({secure_url}) => imgurl = secure_url)
//     .catch(err => console.log(err))
//   })

//   function uploadProfile(e){
//     //action="/profile/edit?user_id={{user._id}}"
//     e.preventDefault()
//     const username = document.getElementById('name').value;
//     const email = document.getElementById('email').value;
//     const description = document.getElementById('description').value;
//     const password = document.getElementById('password').value;
//     const image = imgurl;

//     const uploads = {
//       username,
//       email,
//       description,
//       password,
//       image
//     }
//     console.log(uploads)
//     axios.post('/profile/edit', uploads)
//     .then(res => console.log(res))
//   }

//   const editP  = document.getElementById('editP')
//   editP.addEventListener('submit', uploadProfile)
// }