export function generateOrderId() {
    // generate a random number between 1 and 1000000
    const randomNumber = Math.floor(Math.random() * 1000000) + 1;
  
    // get the current timestamp in milliseconds
    const timestamp = new Date().getTime();
  
    // combine the random number and timestamp to create the order ID
    return `ORD-${randomNumber}-${timestamp}`;
  }