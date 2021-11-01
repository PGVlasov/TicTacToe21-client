import React, { useState } from "react";
import Button from "../../UI/Button/Button";
import classes from "./Uploader.module.css";
import axios from "axios";

const Uploader1 = () => {
  const [image, setImage] = useState([]);
  const [isAvatarAdded, setIsAvatarAdded] = useState(false);

  const addAvatar = (event) => {
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
      });
      // .then(function (response) {
      //   console.log(response);
      // })
      // .catch(function (response) {
      //   console.log(response);
      // });
    } catch (error) {
      console.log(error.response.data);
    }
    document.location = "/player";
  };

  const onChange = (event) => {
    setImage([...URL.createObjectURL(event.target.files[0])]);
    setIsAvatarAdded(true);
    setImage([event.target.files[0]]);
  };

  return (
    <div className={classes.Uploader}>
      <input
        className={classes.Photo}
        type="file"
        nv-file-select=""
        onChange={(event) => onChange(event)}
        disabled={isAvatarAdded}
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
