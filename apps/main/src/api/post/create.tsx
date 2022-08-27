import axios from 'axios';
import { BASE_API, POST_ENDPOINT } from '../../constants';
import { baseApi } from '../base-api';

export async function createPostApi(payload: any) {
  const token = localStorage.getItem('token') || null;
  try {
    const { data } = await axios({
      method: 'POST',
      url: BASE_API + POST_ENDPOINT.BASE + POST_ENDPOINT.CREATE,
      data: payload,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
}
