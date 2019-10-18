const { authenticate } = require('@feathersjs/authentication').hooks;

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [
      async context => {
        if(context.data.user.trim() === '') {
          throw new Error("User can not be empty");
        }
        if(context.data.customer.trim() === '') {
          throw new Error("Customer can not be empty");
        }
        if(context.data.product.trim() === '') {
          throw new Error("Product can not be empty");
        }
        if(context.data.qty.trim() === '' || context.data.qty.trim() === '0') {
          throw new Error("Product's Quantity can not be 0 or empty");
        }

        const productSales = context.data.product;
        const qtySales = context.data.qty;

        const product = await context.app.service('products').get(productSales);
        const stock = product.stock;
        const productName = product.product_name;

        if (stock < qtySales) { 
          throw new Error("Not Enough Stock for "+ productName +". Remaining Stock is " + stock);
        } 
      }
    ],
    update: [
      async context => {
        if(context.data.user.trim() === '') {
          throw new Error("User can not be empty");
        }
        if(context.data.customer.trim() === '') {
          throw new Error("Customer can not be empty");
        }
        if(context.data.product.trim() === '') {
          throw new Error("Product can not be empty");
        }
        if(context.data.qty.trim() === '' || context.data.qty.trim() === '0') {
          throw new Error("Product's Quantity can not be 0 or empty");
        }

        const productSales = context.data.product;
        const qtySales = context.data.qty;

        const product = await context.app.service('products').get(productSales);
        const stock = product.stock;
        const productName = product.product_name;

        if (stock < qtySales) { 
          throw new Error("Not Enough Stock for "+ productName +". Remaining Stock is " + stock);
        } 
      }
    ],
    patch: [
      async context => {
        if(context.data.user.trim() === '') {
          throw new Error("User can not be empty");
        }
        if(context.data.customer.trim() === '') {
          throw new Error("Customer can not be empty");
        }
        if(context.data.product.trim() === '') {
          throw new Error("Product can not be empty");
        }
        if(context.data.qty.trim() === '' || context.data.qty.trim() === '0') {
          throw new Error("Product's Quantity can not be 0 or empty");
        }

        const productSales = context.data.product;
        const qtySales = context.data.qty;

        const product = await context.app.service('products').get(productSales);
        const stock = product.stock;
        const productName = product.product_name;

        if (stock < qtySales) { 
          throw new Error("Not Enough Stock for "+ productName +". Remaining Stock is " + stock);
        } 
      }
    ],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
