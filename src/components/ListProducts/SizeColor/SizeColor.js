import React, { useState } from "react";
import map from "lodash/map";
import { Input, Button } from "reactstrap";
import { useCart } from "@/hooks/useCart";
import { toast } from "react-toastify";

import styles from "./SizeColor.module.scss";

export function SizeColor({ propductTC, toggle }) {
  const { addCart } = useCart();
  const [idProduct, setIdPropduct] = useState();
  const [quantity, setQuantity] = useState(1);
  const [selectedTalla, setSelectedTalla] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const tallas = [...new Set(propductTC.map((item) => item.talla))];
  const colores = [...new Set(propductTC.map((item) => item.color))];

  // Filtrar los colores disponibles según la talla seleccionada
  const availableColors = selectedTalla
    ? [
        ...new Set(
          propductTC
            .filter((item) => item.talla === selectedTalla)
            .map((item) => item.color)
        ),
      ]
    : colores;

  // Filtrar las tallas disponibles según el color seleccionado
  const availableTallas = selectedColor
    ? [
        ...new Set(
          propductTC
            .filter((item) => item.color === selectedColor)
            .map((item) => item.talla)
        ),
      ]
    : tallas;

  // Manejador de selección de talla
  const handleTallaClick = (talla) => {
    setSelectedTalla(talla);
    // Si ya hay un color seleccionado y no está disponible para esta talla, reinicia el color
    if (selectedColor && !availableColors.includes(selectedColor)) {
      setSelectedColor(null);
    }
  };

  // Manejador de selección de color
  const handleColorClick = (color) => {
    setSelectedColor(color);
    // Si ya hay una talla seleccionada y no está disponible para este color, reinicia la talla
    if (selectedTalla && !availableTallas.includes(selectedTalla)) {
      setSelectedTalla(null);
    }
  };

  const getCodigoProducto = (talla, color) => {
    const productoCoincidente = propductTC.find(
      (item) => item.talla === talla && item.color === color
    );
    return productoCoincidente ? productoCoincidente.codigo : null;
  };

  const addData = () => {
    const item = getCodigoProducto(selectedTalla, selectedColor);
    addCart(item, quantity);
    toast.success("¡Se agrego con exito!");
    toggle();
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    setQuantity(value);
  };

  return (
    <div className={styles.sizeColor}>
      <div className={styles.sizeColor__container}>
        <h5>Talla:</h5>
        {tallas.map((talla) => (
          <button
            key={talla}
            onClick={() => handleTallaClick(talla)}
            disabled={!availableTallas.includes(talla)}
            className={`${styles.button} 
            ${selectedTalla === talla ? styles.selected : styles.active}
            ${!availableTallas.includes(talla) ? styles.inactive : ""}`}
          >
            {talla}
          </button>
        ))}

        <h5>Color:</h5>
        {colores.map((color) => (
          <button
            key={color}
            onClick={() => handleColorClick(color)}
            disabled={!availableColors.includes(color)}
            className={`${styles.button} ${
              selectedColor === color ? styles.selected : styles.active
            } ${!availableColors.includes(color) ? styles.inactive : ""}`}
          >
            {color}
          </button>
        ))}

        <h5>Cantidad</h5>
        <Input
          value={quantity}
          type="number"
          name="cantidad"
          id="cantidad"
          placeholder="Cantidad"
          onChange={handleQuantityChange}
        />
        <div>
          <Button
            color="primary"
            onClick={addData}
            disabled={!selectedTalla || !selectedColor}
          >
            Aceptar
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}
