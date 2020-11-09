import { useReducer } from 'react';


import {
    ADD_TO_DONATION,
    REMOVE_FROM_DONATION,
    UPDATE_DONATION_QUANTITY,
    CLEAR_DONATION,
    TOGGLE_DONATION
  } from './actions';
  
  export const reducer = (state, action) => {
    switch (action.type) {
        case ADD_TO_DONATION:
  return {
    ...state,
    donationOpen: true,
    donation: [...state.donation, action.amount]
  };

  case REMOVE_FROM_DONATION:
  let newState = state.donation.filter(amount => {
    return amount._id !== action._id;
  });

  return {
    ...state,
    donationOpen: newState.length > 0,
    donation: newState
  };

  case UPDATE_DONATION_QUANTITY:
  return {
    ...state,
    donationOpen: true,
    donation: state.donation.map(amount => {
      if (action._id === amount._id) {
        amount.purchaseQuantity = action.purchaseQuantity;
      }
      return amount;
    })
  };

  case CLEAR_DONATION:
  return {
    ...state,
    donationOpen: false,
    donation: []
  };

  case TOGGLE_DONATION:
  return {
    ...state,
    donationOpen: !state.donationOpen
  };
}
//    

