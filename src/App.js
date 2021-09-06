import React from 'react'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CheckoutForm } from './components/CheckoutForm'

import 'bootswatch/dist/lux/bootstrap.min.css'
import './App.css';

const stripePromise = loadStripe('pk_test_51JWVWvIDyieeZ6c287uvoAoGjDOTjI2nw4Es7QQyOlG4t2ODkq0HwHbBfljvXq6CqklLr51N1SIv1DSKqX8qqAtq00AaO7UggG');

function App() {
  return (
    <Elements stripe={stripePromise}>
      <div className="container p-4">
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <CheckoutForm />
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default App;
