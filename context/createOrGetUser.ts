import { client } from '@/utils/sanityClient';
import jwt_decode from 'jwt-decode';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const createOrGetUser = async (response: any, addUser: any) => {
  const decoded: { name: String, email: String, picture: String, sub: string } = jwt_decode(response.credential);

  const { name, sub, email } = decoded;

  const user = {
    _id: sub,
    _type: 'user',
    userName: name,
    email: email,
  };

  addUser(user);
  client.createIfNotExists(user)
  // await axios.post(`${BASE_URL}/api/auth`, user);
};