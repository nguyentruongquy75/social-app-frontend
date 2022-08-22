import axios from 'axios';
import Pubsub from 'pubsub-js';
import { toast } from 'react-toastify';
import { BASE_API, EVENTS } from '../constants';

export async function baseApi(endpoint = '', method = 'GET', body = {}) {
  const url = `${BASE_API}${endpoint}`;
  const token = localStorage.getItem('token') || null;

  try {
    const headers: any = {
      'Content-type': 'application/json; charset=UTF-8',
    };

    if (token) headers['Authorization'] = `Bearer ${token}`;

    const config: any = {
      method,
      headers,
    };

    if (method !== 'GET') config['data'] = body;

    const response = await axios(url, config);

    return response.data;
  } catch (error: any) {
    console.log(error);
    toast.error(error?.response.data.message);
  }
}
