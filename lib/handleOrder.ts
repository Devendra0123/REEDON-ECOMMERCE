import { client } from "@/utils/sanityClient";


export const handleOrder = async(orderId:string,cartItems: any, totalQuantities: any, shippingDetails: any, deliveryCharge: any, userId: any) => {

    const doc = {
        _type: 'order',
        orderId: orderId,
        shippingDetails: {
            userId: userId,
            customerName: shippingDetails.customerName,
            email: shippingDetails.email,
            location: shippingDetails.location,
            contactNumber: shippingDetails.contactNumber
        },
        totalQuantity: totalQuantities,
        totalPrice: cartItems.reduce((total: number, item: any) => total + item.currentPrice * item.quantity, 0),
        deliveryCharge: deliveryCharge,
        deliveryStatus: 'Processing',
        items: cartItems.map((item: any) => {
            return {
                _key: item._rev,
                product: {
                    _type: 'reference',
                    _ref: item._id
                  },
                productPrice: item.currentPrice,
                productQuantity: item.quantity
            }
        })
    }

    try {
       await client.create(doc).then((data: any) => data);
    }
    catch (error) {
        console.log(error)
    }

}