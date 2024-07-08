import { tokenAuth } from '@/utils/tokenAuth';
import axios from 'axios';
import Cookies from 'js-cookie';

export const get = async (path: string, contentType: string) => {
  try {
    return await axios.get(`${process.env.API_URL}${path}`, {
      headers: {
        Authorization: `Bearer ${tokenAuth()}`,
        'Content-Type': contentType ? contentType : 'application/json',
      },
    }).then((res) => {
      return res;
    }).catch((err) => {
      return err;
    });
  } catch (error) {
    return error;
  }
}

export const post = async (path: string, params: any, contentType: string) => {
  try {
    return await axios.post(`${process.env.API_URL}${path}`, params, {
      headers: {
        Authorization: `Bearer ${tokenAuth()}`,
        'Content-Type': contentType ? contentType : 'application/json',
      },
    }).then((res) => {
      console.log('res', res);
      return res;
    }).catch((err) => {
      return err;
    });
  } catch (error) {
    return error;
  }
}

export const put = async (path: string, params: any, contentType: string) => {
  try {
    return await axios.put(`${process.env.API_URL}${path}`, params, {
      headers: {
        Authorization: `Bearer ${tokenAuth()}`,
        'Content-Type': contentType ? contentType : 'application/json',
      },
    }).then((res) => {
      return res;
    }).catch((err) => {
      return err;
    });
  } catch (error) {
    return error;
  }
}