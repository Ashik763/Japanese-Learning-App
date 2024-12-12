import {jwtDecode} from 'jwt-decode';

export const decodeToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    console.log('Decoded Token:', decoded);
    return decoded;
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};