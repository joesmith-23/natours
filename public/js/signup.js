/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Successfully created an account');
      window.setTimeout(() => {
        location.assign('/me');
      }, 1000);
    }
  } catch (err) {
    console.log('signup.js error');
    showAlert('error', err.response.data.message);
  }
};
