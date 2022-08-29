import axios from 'axios';
import { BASE_API, USER_ENDPOINT } from '../../constants';

export async function changeImageApi(payload: any) {
  const token = localStorage.getItem('token') || null;
  try {
    const { data } = await axios({
      method: 'PUT',
      url: BASE_API + USER_ENDPOINT.BASE + USER_ENDPOINT.UPDATE,
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
