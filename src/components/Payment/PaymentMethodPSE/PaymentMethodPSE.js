// src/components/Payment/PaymentMethodPSE/PaymentMethodPSE.js
import React, { useEffect, useState } from 'react';
// import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

const PaymentMethodPSE = () => {
  const [preferenceId, setPreferenceId] = useState(null);

  useEffect(() => {
    // initMercadoPago('YOUR_PUBLIC_KEY', {
    //   locale: 'es-CO',
    // });

    // fetch('/api/create_preference', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     title: 'Producto de prueba',
    //     quantity: 1,
    //     unit_price: 100.0,
    //   }),
    // })
    //   .then(response => response.json())
    //   .then(data => setPreferenceId(data.id));
  }, []);

  const initialization = {
    amount: 100,
  };

  return (
    <div>
      {preferenceId ? (
        <h1>sdd</h1>
        // <Wallet initialization={{ preferenceId }} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PaymentMethodPSE;