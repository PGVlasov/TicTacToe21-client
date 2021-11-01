import React, { Component } from "react";
import Button from "../../UI/Button/Button";
import classes from "./Uploader.module.css";
import axios from "axios";

const Uploader1 = () => {
  //   addAvatar(event) {
  //     document.location = "/player";
  //   }
  //   state = {
  //     image: [],
  //     isAvatarAdded: false,
  //   };

  //   onChange = (event, image) => {
  //     this.setState({
  //       image: URL.createObjectURL(event.target.files[0]),
  //       isAvatarAdded: true,
  //     });
  //     this.state.image.push(event.target.files[0]);
  //     const img = this.state.image;
  //     const fdata = new FormData();
  //     fdata.append("image", img[0]);
  //     fdata.append("userId", JSON.stringify(localStorage.getItem("localID")));

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
  //   };

  return (
    <div className={classes.Uploader}>
      <input
        type="file"
        nv-file-select=""
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        disabled={this.state.isAvatarAdded}
      />
      <img
        id="target"
        className={classes.Photo}
        src={this.state.image}
        alt={"фото не выбрано"}
      />

      <Button
        type="success"
        onClick={this.addAvatar}
        disabled={!this.state.isAvatarAdded}
      >
        Сохранить фотографию
      </Button>
    </div>
  );
};
