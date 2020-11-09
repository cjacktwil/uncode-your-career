import React from 'react';
import { useDispatch } from 'react-redux';
import { REMOVE_FROM_DONATION, UPDATE_DONATION_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import { REMOVE_FROM_DONATION } from '../utils/action';

const DonationAmount = ({ amount }) => {
  const dispatch = useDispatch();

  const removeFromDonation = amount => {
    dispatch({
      type: REMOVE_FROM_DONATION,
      _id: amount._id
    });
    idbPromise('donation', 'delete', { ...amount });

  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === '0') {
      dispatch({
        type: REMOVE_FROM_DONATION,
        _id: amount._id
      });
      idbPromise('donation', 'delete', { ...amount });

    } else {
      dispatch({
        type: UPDATE_DONATION_QUANTITY,
        _id: amount._id,
        purchaseQuantity: parseInt(value)
      });
      idbPromise('donation', 'put', { ...amount, purchaseQuantity: parseInt(value) });

    }
  }

  return (
    <div className="flex-row">
      <div>
        <div>${amount.price}</div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={amount.purchaseQuantity}
            onChange={onChange}
          />
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeFromDonation(amount)}
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
}

export default DonationAmount;
