import React, { useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false)
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    })

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      const { id } = paymentMethod;
      try {
        setLoading(true);
        const { data } = await axios.post('http://localhost:3001/api/checkout/', {
          id,
          amount: 100 * 100
        });
        console.log('[data]', data);

        // Clear the form
        elements.getElement(CardElement).clear();

      } catch (error) {
        console.log('[error]', error.response.data);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card card-body">
      <img
        src="https://www.corsair.com/corsairmedia/sys_master/productcontent/CH-9102020-NA-K68_01.png"
        alt="product"
        className="img-fluid"
      />
      <h2 className="text-end mt-2">$100</h2>
      <div className="form-group mt-2">
        <CardElement className="form-control" />
      </div>
      <button
        className="btn btn-success mt-4"
        disabled={!stripe || loading}
      >
        {
          loading ?
            (
              <div className="spinner-border text-light" role="status">
              </div>
            ) :
            'Pay'
        }
      </button>
    </form>
  )
}
