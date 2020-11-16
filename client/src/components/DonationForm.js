import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Input, Form } from "antd";
import {
  CardElement,
  Elements,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';

// Custom styling can be passed to options when creating an Element.
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  }
};

const DonationForm = () => {
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const [amountFormData, setAmountFormData] = useState({ amount: '' });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAmountFormData({ ...amountFormData, [name]: value });
  };

  // Handle real-time validation errors from the card Element.
  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  }

  // Handle form submission.
  const handleSubmit = async (event) => {
    event.preventDefault();
    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    if (result.error) {
      // Inform the user if there was an error.
      setError(result.error.message);
    } else {
      setError(null);
      // Send the token to your server.
      stripeTokenHandler(result.token);
    }
  };

  return (
    <>
      Donation Amount:
      <Form.Item
        onChange={handleInputChange}
        value={amountFormData.amount}
        label=""
        rules={[
          {
            required: true,
            message: 'Please input your amount.',
          },
        ]}
      >
        <Input name="Amount" />
      </Form.Item>
      <>
        Name on Card:
        <Form.Item
          onChange={handleInputChange}
          value={amountFormData.name}
          label=""
          rules={[
            {
              required: true,
              message: 'Please input your name.',
            },
          ]}
        >
          <Input name="Name" />
        </Form.Item>
      </>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label for="card-element">
            Credit or Debit Card:
        </label>
          <CardElement
            id="card-element"
            options={CARD_ELEMENT_OPTIONS}
            onChange={handleChange}
          />
          <div className="card-errors" role="alert">{error}</div>
        </div>
        <button type="submit">Thank you!😃</button>
      </form>
    </>);
}

// Setup Stripe.js and the Elements provider
const stripePromise = loadStripe('pk_test_51HlLBgLzp2GzCQgyaJRYbpxGWjhr5MYLRw8IRrWhrb8nPZpU6HIy0RSig0uK9VNeLHC5T8sR6GpcKUdj6qBM591P00XA71VO5t');

const App = () => {
  return (
    <Elements stripe={stripePromise}>
      <DonationForm />
    </Elements>
  );
}

// POST the token ID to your backend.
async function stripeTokenHandler(token) {
  const response = await fetch('/charge', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: token.id })
  });
  return response.json();
}

export default DonationForm;