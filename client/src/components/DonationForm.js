import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
// import { idbPromise } from "../../utils/helpers";
import DonationAmount from "../components/DonationAmount";
import Auth from '../utils/auth';
// import { useStoreContext } from "../../utils/GlobalState";
import { TOGGLE_Donation } from "../utils/action";


const stripePromise = loadStripe('pk_test_51HlLBgLzp2GzCQgyaJRYbpxGWjhr5MYLRw8IRrWhrb8nPZpU6HIy0RSig0uK9VNeLHC5T8sR6GpcKUdj6qBM591P00XA71VO5t');

const [state, dispatch] = useStoreContext();
const { donation } = state;
const { data: categoryData } = useQuery(QUERY_CATEGORIES);

function toggleDonation() {
  dispatch({ type: TOGGLE_DONATION });
}

const Donation = () => {
  // const [state, dispatch] = use;

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToDonation({ sessionId: data.donation.session })
    })
      }
    }
  , [data]);
  useEffect(() => {
    async function getDonation() {
      const Donation = await idbPromise('Donation', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_Donation, products: [...Donation] });
    };

    if (!state.Donation.length) {
      getDonation();
    }
  }, [state.Donation.length, dispatch]);

  function toggleDonation() {
    dispatch({ type: TOGGLE_Donation });
  }

  function submitDonation() {
    const productIds = [];

    state.Donation.forEach((amount) => {
      for (let i = 0; i < amount.purchaseQuantity; i++) {
        productIds.push(amount._id);
      }
    });

    getCheckout({
      variables: { products: productIds }
    });
  }

  if (!state.DonationOpen) {
    return (
      <div className="Donation-closed" onClick={toggleDonation}>
        <span
          role="img"
          aria-label="trash">🛒</span>
      </div>
    );
  }

  return (
    <div className="Donation">
      <div className="close" onClick={toggleDonation}>[close]</div>
      <h2>Donation</h2>
      {state.Donation.length ? (
        <div>
          {state.Donation.map(amount => (
            <Donationamount key={amount._id} amount={amount} />
          ))}

          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>

            {
              Auth.loggedIn() ?
                <button onClick={submitDonate}>
                  Donate
              </button>
                :
                <span>(log in to Donate)</span>
            }
          </div>
        </div>
      ) : (
          <h3>
            <span role="img" aria-label="shocked">
            😃 
          </span>
          We're very thankful for your donation! 
          </h3>
        )}
    </div>
  )};
;


<script src="https://js.stripe.com/v3/"></script>
export default Donation;
