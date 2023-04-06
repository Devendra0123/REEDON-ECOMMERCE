import axios from 'axios';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const createOrGetshippingDetails = async (info: any, addshippingDetails: any) => {
  const details : {customerName:String, email:String, location:String, contactNumber:number } = info;

  const { customerName, location, contactNumber, email } = details;
  
  const shippingDetails = {
    customerName: customerName,
    email: email,
    location: location,
    contactNumber: contactNumber
  };
  
  addshippingDetails(shippingDetails);

 // await axios.post(`${BASE_URL}/api/auth`, shippingDetails);
};