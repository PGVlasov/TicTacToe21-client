import React from "react";
//import ReactDOM from "react-dom";
import ImageUploading from "react-images-uploading";
import Button from "../../UI/Button/Button";
import classes from "./Uploader.module.css";
import axios from "axios";

// const Uploader = () => {
//   let state = {
//     image: [],
//     isAvatarAdded: false,
//   };

//   //let img = []
//   const [image, setImg] = useState();

//   // const [images, setImages] = React.useState([])

//   const onChange = (event, image) => {
//     this.setState({
//       image: URL.createObjectURL(event.target.files[0]),

//     });
//     //isAvatarAdded: true,
//     this.state.image.push(event.target.files[0]);
//     const img = this.state.image;
//     console.log("IMG", img);
//     console.log(this.state.isAvatarAdded);
//     console.log(img[0]);
//     return img;
//     // data   for submit
//     // if (event.target.files && event.target.files[0]) {
//     //   this.setState({
//     // // image: URL.createObjectURL(event.target.files[0]),
//     // img: event.target.files,
//     //   });
//     // const img = event.target.files;
//     //return img;
//     // }
//     // const avatarFile = event.target.files;
//     // console.log(avatarFile);
//     // return avatarFile;
//     // const fdata = new FormData();
//     // console.log(img);
//     // fdata.append("image", img[0]);
//     // console.log(fdata);
//     // try {
//     //   axios({
//     //     method: "post",
//     //     url: "/avatar",
//     //     data: fdata,
//     //     headers: { "Content-Type": "multipart/form-data" },
//     //   })
//     //     .then(function (response) {
//     //       console.log(response);
//     //     })
//     //     .catch(function (response) {
//     //       console.log(response);
//     //     });
//     // } catch (error) {
//     //   console.log(error.response.data);
//     // }
//     // return fdata;
//   };

//   const onSubmit = () => {
//     console.log("!!!!!");
//   };

//   function onImageUpdate() {}

//   function onImageRemove() {}

//   const addAvatar = (img, event) => {
//     //event.preventDefault();

//     const fdata = new FormData();
//     console.log(img);
//     fdata.append("image", img[0]);
//     console.log(fdata);
//     try {
//       axios({
//         method: "post",
//         url: "/avatar",
//         data: fdata,
//         headers: { "Content-Type": "multipart/form-data" },
//       })
//         .then(function (response) {
//           console.log(response);
//         })
//         .catch(function (response) {
//           console.log(response);
//         });
//     } catch (error) {
//       console.log(error.response.data);
//     }
//     return fdata;
//     // const fdata = new FormData();
//     // console.log(img);
//     // fdata.append("image", this.state.image);
//     // console.log(fdata);
//     // try {
//     //   const config = { headers: { "Content-Type": false } };
//     //   axios({
//     //     method: "post",
//     //     url: "/avatar",
//     //     data: fdata,
//     //     headers: { "Content-Type": "multipart/form-data" },
//     //   })
//     //     .then(function (response) {
//     //       console.log(response);
//     //     })
//     //     .catch(function (response) {
//     //       console.log(response);
//     //     });
//     // } catch (error) {
//     //   console.log(error.response.data);
//     // }

//     //document.location = "/player";
//   };

//   return (
//     <div className={classes.Uploader}>
//       <input
//         type="file"
//         nv-file-select=""
//         onChange={onChange()}
//         onSubmit={onSubmit()}
//       />
//       <img
//         id="target"
//         className={classes.Photo}
//         src={this.state.image}
//         alt={"фото не выбрано"}
//       />

//       <Button
//         type="success"
//         onClick={addAvatar()}
//         disabled={!this.state.isAvatarAdded}
//       >
//         Сохранить фотографию
//       </Button>
//       {/* {imageList.map((image, index) => (
//             <div key={index} className={classes.PlayerPhoto}>
//               <div></div>
//             </div>
//           ))} */}
//     </div>
//   );
// };

// export default Uploader;

// import React, { Component } from "react";
// import classes from "./Links.module.css";
// import Button from "../Button/Button";

// export default class Links extends Component() {
//   state = {
//     links: [],
//   };

//   async componentDidMount(state) {
//     fetch("/createGame")
//       .then((res) => res.json())
//       .then(console.log("got something"));
//     //.then((links) => this.setState({ links }));
//   }
//   render() {
//     return (
//       <div>
/* {this.state.links.map((link) => (
      
          <div className={classes.li} key={link.id}>
            <a href={link.title} className={classes.a}>
  
              {"играть против:  " + link.creator}
            </a>

            <Button type="error">&times;</Button>
        
          </div>
        ))}
      */
//       </div>
//     );
//   }
// }

// {links.map((link) =>
