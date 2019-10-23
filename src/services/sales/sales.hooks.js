const { authenticate } = require('@feathersjs/authentication').hooks;
const { populate } = require('feathers-hooks-common');
const _ = require('lodash'); 

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

        const product = await context.app.service('products').find();
        const dataProduct = product.data;
        const list = context.data.list;
        let total = 0;
        _.forEach(list, function(value, key) {
          if(value.product.trim() === '') {
            throw new Error("Product can not be empty");
          }
          if(value.qty.trim() === '' || value.qty.trim() === '0') {
            throw new Error("Product's Quantity can not be 0 or empty");
          }

          const checkProduct = _.find(dataProduct, function(o) { return o._id == value.product; }); 
          if (checkProduct.stock < value.qty) { 
            throw new Error("Not Enough Stock for "+ checkProduct.product_name +". Remaining Stock is " + checkProduct.stock);
          } 
          value.price = checkProduct.price;
          total += (checkProduct.price * value.qty);
        });
        context.data.total = total;
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

        const product = await context.app.service('products').find();
        const dataProduct = product.data;
        const list = context.data.list;
        let total = 0;
        _.forEach(list, function(value, key) {
          if(value.product.trim() === '') {
            throw new Error("Product can not be empty");
          }
          if(value.qty.trim() === '' || value.qty.trim() === '0') {
            throw new Error("Product's Quantity can not be 0 or empty");
          }

          const checkProduct = _.find(dataProduct, function(o) { return o._id == value.product; }); 
          if (checkProduct.stock < value.qty) { 
            throw new Error("Not Enough Stock for "+ checkProduct.product_name +". Remaining Stock is " + checkProduct.stock);
          } 
          value.price = checkProduct.price;
          total += (checkProduct.price * value.qty);
        });
        context.data.total = total; 
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

        const product = await context.app.service('products').find();
        const dataProduct = product.data;
        const list = context.data.list;
        let total = 0;
        _.forEach(list, function(value, key) {
          if(value.product.trim() === '') {
            throw new Error("Product can not be empty");
          }
          if(value.qty.trim() === '' || value.qty.trim() === '0') {
            throw new Error("Product's Quantity can not be 0 or empty");
          }

          const checkProduct = _.find(dataProduct, function(o) { return o._id == value.product; }); 
          if (checkProduct.stock < value.qty) { 
            throw new Error("Not Enough Stock for "+ checkProduct.product_name +". Remaining Stock is " + checkProduct.stock);
          } 
          value.price = checkProduct.price;
          total += (checkProduct.price * value.qty);
        });
        context.data.total = total;
      }
    ],
    remove: []
  },

  after: {
    all: [
      async context => {
        const { Model } = context.app.service('products')
        const listProduct = await Model.aggregate([ { $project: { name: '$product_name' } } ]);

        let result;
        if (context.result.data===undefined) {
          result = context.result;
          _.forEach(result.list, function(value, key) {
            const checkProduct = _.find(listProduct, {'_id': value.product});
            value.productName = checkProduct.name;
            value.totalItem = value.qty * value.price;
          });
        } else {
          result = context.result.data;
          _.forEach(result, function(value, key) {
            const list = value.list;
            _.forEach(list, function(value, key) {
              const checkProduct = _.find(listProduct, {'_id': value.product});  
              value.productName = checkProduct.name;
              value.totalItem = value.qty * value.price;
            });
          });
        }
        return context;
      },
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
            }
          ]
        }
      })
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
