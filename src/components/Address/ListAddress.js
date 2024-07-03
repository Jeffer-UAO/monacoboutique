import React from 'react'
import { map } from "lodash";


import styles from "./Address.module.scss";
import { Label } from 'reactstrap';

export function ListAddress({address}) {
  return (
    <div className={styles.list_address}>
      <h4>Direcciones</h4>
      <div className={styles.car}>
        
        {address && map(address, (addres, index) => (
          <div key={index} className={styles.car__address}>
            <h6>{addres.title}</h6>
            <p>{addres.name_lastname}</p>
            <p>{addres.address}</p>
            <p>{addres.phone}</p>
            <p>{addres.city}</p>
            <label>Seleccionar</label>
          </div>
        ))}
      </div>
    </div>
  )
}
