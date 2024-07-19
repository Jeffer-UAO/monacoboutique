import React, { createContext, useContext, useEffect, useState } from 'react';
// import { loadMercadoPago, initMercadoPago, Wallet } from '@mercadopago/sdk-react';


const MercadoPagoContext = createContext();

export const MercadoPagoProvider = ({ children }) => {
  const [preferenceId, setPreferenceId] = useState(null);
  const [mercadoPago, setMercadoPago] = useState(null);
  const [error, setError] = useState(null);

  // const mercadoPagoInstance =  initMercadoPago("TEST-acb95001-cbd2-4ebe-afef-0bac30b03a8f");
 


  return (
    <MercadoPagoContext.Provider value={{ mercadoPago, error }}>
      {children}
    </MercadoPagoContext.Provider>
  );
};

export const useMercadoPago = () => useContext(MercadoPagoContext);