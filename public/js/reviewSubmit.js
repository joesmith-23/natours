/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const reviewSubmit = async (review, rating, tourId) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `http://localhost:3000/api/v1/tours/${tourId}/reviews`,
      data: {
        review,
        rating
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Successfully submitted review');
      window.setTimeout(() => {
        location.reload();
      }, 1000);
    }
  } catch (err) {
    if (err.response.data.error.code == 11000) {
      showAlert('error', 'Sorry, you can only review the tour once');
    } else {
      showAlert('error', err.response.data.message);
    }
    console.log(err.response);
  }
};
