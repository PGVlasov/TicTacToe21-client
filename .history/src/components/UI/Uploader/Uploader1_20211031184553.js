import React, { useState } from "react";
import Button from "../../UI/Button/Button";
import classes from "./Uploader.module.css";
import axios from "axios";

const Uploader1 = () => {
  const addAvatar = (event) => {
    document.location = "/player";
  };
  const [image, setImage] = useState([]);
  const [isAvatarAdded, setisAvatarAdded] = useState(false);

  const onChange = (event, image) => {
    // this.setState({
    //   image: URL.createObjectURL(event.target.files[0]),
    //   isAvatarAdded: true,
    // });
    setImage(URL.createObjectURL(event.target.files[0]));
    setisAvatarAdded(true);
    // image.push(event.target.files[0]);
    const img = image;
    const fdata = new FormData();
    fdata.append("image", img[0]);
    fdata.append("userId", JSON.stringify(localStorage.getItem("localID")));

    try {
      axios({
        method: "post",
        url: "/avatar",
        data: fdata,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (response) {
          console.log(response);
        });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className={classes.Uploader}>
      <input
        type="file"
        nv-file-select=""
        onChange={(event) => onChange(event)}
        disabled={isAvatarAdded}
      />
      <img
        id="target"
        className={classes.Photo}
        src={image}
        alt={"фото не выбрано"}
      />

      <Button
        type="success"
        onClick={(event) => addAvatar(event)}
        disabled={!isAvatarAdded}
      >
        Сохранить фотографию
      </Button>
    </div>
  );
};

export default Uploader1;
