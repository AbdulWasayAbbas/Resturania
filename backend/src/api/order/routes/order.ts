module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/order/checkout', // your desired endpoint
      handler: 'order.submitOrder', // this must match your controller function
      config: {
        auth: false, // or true if you want to protect it
      },
    },
    {
      method: 'GET',
      path: '/orders/getOrders', // your desired endpoint
      handler: 'order.findOrders', // this must match your controller function
      config: {
        auth: false, // or true if you want to protect it
      },
    },
  ],
};
