const { authenticate } = require('@feathersjs/authentication').hooks;
const { populate } = require('feathers-hooks-common');

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

        // const list = context.data.list;

        // const product = context.app.service('products').get('5da3dcb32cd1a61130d73d2e');
        //     throw new Error(JSON.stringify(product));

        // list.forEach(
        //   function(val){
        //     if(val.product.trim() === '') {
        //       throw new Error("Product can not be empty");
        //     }
        //     if(val.qty.trim() === '' || val.qty.trim() === '0') {
        //       throw new Error("Quantity can not be 0 or empty");
        //     }

            

        //     const stock = product.stock;
        //     const productName = product.product_name;

        //     if (stock < val.qty) { 
        //       throw new Error("Not Enough Stock for "+ productName +". Remaining Stock is " + stock);
        //     } 
        //   }
        // )

        // throw new Error(JSON.stringify(list));

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
    all: [
      populate({
        schema: {
          include: [
            {
              service: 'profil',
              nameAs: 'user',
              parentField: 'user',
              childField: '_id',
              query: {
                $select: ['name']
              }
            },
            {
              service: 'customers',
              nameAs: 'customer',
              parentField: 'customer',
              childField: '_id',
              query: {
                $select: ['name']
              }
            },
            {
              service: 'products',
              nameAs: 'product',
              parentField: 'product',
              childField: '_id',
              query: {
                $select: { 
                  "product_name": ['product_name'],
                  "price": ['price']
                }
              }
            }
          ]
        }
      }),
    ],
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
