import React from "react";
import styles from "./Redes.module.scss";
import { CardImg } from "reactstrap";

import { IoLogoWhatsapp } from "react-icons/io";
import { GiRotaryPhone } from "react-icons/gi";
import { AiFillInstagram } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";

export function Redes() {
  return (
    <div className={styles.space}>
     <CardImg src="/image/monaco-text.png" alt="No hay logo" />{" "}
    </div>
  );
}
