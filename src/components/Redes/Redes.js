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
      <ul>
        <li>DESPACHOS A TODA COLOMBIA</li>
        {/* <li>Facebook</li> */}
        <p>Cel: 3216540641</p>
      </ul>
    </div>
  );
}
