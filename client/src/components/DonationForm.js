import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Button, Input, Form } from "antd";
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
    Amount 
    <Form.Item
        onChange={handleInputChange}
        value={amountFormData.amount}
        label="Amount"

        rules={[
          {
            required: true,
            message: 'Please input your amount.',
          },
        ]}
      >

        <Input name="Amount" />
      </Form.Item>
     
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <label for="card-element">
          Credit or debit card
        </label>
        <CardElement
          id="card-element"
          options={CARD_ELEMENT_OPTIONS}
          onChange={handleChange}
        />
        <div className="card-errors" role="alert">{error}</div>
      </div>
      <button type="submit">Submit Payment</button>
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
    body: JSON.stringify({token: token.id})
  });

  return response.json();
}

export default DonationForm;









// import React, { useState } from 'react';
// import { Button, Input, Form } from "antd";
// import Auth from '../utils/auth';
// import { useMutation } from '@apollo/react-hooks';
// import { DONATION_AMOUNT } from '../utils/mutations';
// import API from "../utils/API"
// import { loadStripe } from "@stripe/stripe-js";


// const stripePromise = loadStripe('pk_test_51HlLBgLzp2GzCQgyaJRYbpxGWjhr5MYLRw8IRrWhrb8nPZpU6HIy0RSig0uK9VNeLHC5T8sR6GpcKUdj6qBM591P00XA71VO5t');

// const DonationForm = () => {
  
//         <Button type="primary" htmlType="submit">
//           Submit
//         </Button>
     
// }


// export default DonationForm;



// import React, { useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// // // import { idbPromise } from "../../utils/helpers";
// // import DonationAmount from "../components/DonationAmount";
// // import Auth from '../utils/auth';
// // // import { useStoreContext } from "../../utils/GlobalState";
// // import { TOGGLE_Donation } from "../utils/action";


// const stripePromise = loadStripe('pk_test_51HlLBgLzp2GzCQgyaJRYbpxGWjhr5MYLRw8IRrWhrb8nPZpU6HIy0RSig0uK9VNeLHC5T8sR6GpcKUdj6qBM591P00XA71VO5t');

// const DonationForm = () => {
//   const [Donate] = useMutation(DONATE_AMOUNT)
//   const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setUserFormData({ ...userFormData, [name]: value });
//   };

//   const handleFormSubmit = async (event) => {
    
//     try {
//       const { data } = await login({
//         variables: { ...userFormData },
//       });


//       console.log(data.login.user);
//       Auth.login(data.login.token);
//     } catch (err) {
//       console.error(err);
//     }

//     setUserFormData({
//       username: '',
//       password: '',
//     });
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log('Failed:', errorInfo);
//   };

//   const layout = {
//     labelCol: {
//       span: 6,
//     },
//     wrapperCol: {
//       span: 16,
//     },
//   };
//   const tailLayout = {
//     wrapperCol: {
//       offset: 8,
//       span: 16,
//     },
//   };

//   return (
// <>
// Login
//     <Form
//       {...layout}
//       name="basic"
//       initialValues={{
//         remember: true,
//       }}
//       onFinish={handleFormSubmit}
//       onFinishFailed={onFinishFailed}

//     >

//       <Form.Item
//         onChange={handleInputChange}
//         value={userFormData.username}
//         label="Username"

//         rules={[
//           {
//             required: true,
//             message: 'Please input your username!',
//           },
//         ]}
//       >

//         <Input name="username" />
//       </Form.Item>

//       <Form.Item onChange={handleInputChange}
//         value={userFormData.password}
//         label="Password"

//         rules={[
//           {
//             required: true,
//             message: 'Please input your password!',
//           },
//         ]}
//       >
//         <Input.Password name="password" />
//       </Form.Item>

//       <Form.Item {...tailLayout}>
//         <Button type="primary" htmlType="submit">
//           Submit
//         </Button>
//       </Form.Item>
//     </Form>
// </>

//   );
// };
// // const [state, dispatch] = useStoreContext();
// // const { donation } = state;
// // const { data: categoryData } = useQuery(QUERY_CATEGORIES);

// // function toggleDonation() {
// //   dispatch({ type: TOGGLE_DONATION });
// // }

// // const Donation = () => {
// //   // const [state, dispatch] = use;

// //   useEffect(() => {
// //     if (data) {
// //       stripePromise.then((res) => {
// //         res.redirectToDonation({ sessionId: data.donation.session })
// //     })
// //       }
// //     }
// //   , [data]);
// //   useEffect(() => {
// //     async function getDonation() {
// //       const Donation = await idbPromise('Donation', 'get');
// //       dispatch({ type: ADD_MULTIPLE_TO_Donation, products: [...Donation] });
// //     };

// //     if (!state.Donation.length) {
// //       getDonation();
// //     }
// //   }, [state.Donation.length, dispatch]);

// //   function toggleDonation() {
// //     dispatch({ type: TOGGLE_Donation });
// //   }

// //   function submitDonation() {
// //     const productIds = [];

// //     state.Donation.forEach((amount) => {
// //       for (let i = 0; i < amount.purchaseQuantity; i++) {
// //         productIds.push(amount._id);
// //       }
// //     });

// //     getCheckout({
// //       variables: { products: productIds }
// //     });
// //   }

// //   if (!state.DonationOpen) {
// //     return (
// //       <div className="Donation-closed" onClick={toggleDonation}>
// //         <span
// //           role="img"
// //           aria-label="trash">🛒</span>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="Donation">
// //       <div className="close" onClick={toggleDonation}>[close]</div>
// //       <h2>Donation</h2>
// //       {state.Donation.length ? (
// //         <div>
// //           {state.Donation.map(amount => (
// //             <Donationamount key={amount._id} amount={amount} />
// //           ))}

// //           <div className="flex-row space-between">
// //             <strong>Total: ${calculateTotal()}</strong>

// //             {
// //               Auth.loggedIn() ?
// //                 <button onClick={submitDonate}>
// //                   Donate
// //               </button>
// //                 :
// //                 <span>(log in to Donate)</span>
// //             }
// //           </div>
// //         </div>
// //       ) : (
// //           <h3>
// //             <span role="img" aria-label="shocked">
// //             😃 
// //           </span>
// //           We're very thankful for your donation! 
// //           </h3>
// //         )}
// //     </div>
// //   )};
// // ;


// <script src="https://js.stripe.com/v3/"></script>
// export default DonationForm;
