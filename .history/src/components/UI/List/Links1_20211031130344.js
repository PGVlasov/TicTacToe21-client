import React, { useState } from "react";
import classes from "./Links.module.css";
import Button from "../Button/Button";

const Links1 = () => {
  const [board, setBoard] = useState(generateInitialBoard());
  const [step, setStep] = useState("X");
  const [isMoveAvaible, setMoveAvaible] = useState(true);
};

export default Links1;
