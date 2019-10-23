const { authenticate } = require('@feathersjs/authentication').hooks;
const { populate } = require('feathers-hooks-common');
const _ = require('lodash'); 

module.exports = {
  before: {
    all: [ 
      authenticate('jwt')
    ],
    find: [],
    get: [
    ],
    create: [
      context => {
        if(context.data.product_name.trim() === '') {
          throw new Error("Product's Name can not be empty");
        }
        if(context.data.distributor.trim() === '') {
          throw new Error("Product's Distributor can not be empty");
        }
        if(context.data.price.trim() === '' || context.data.price.trim() === '0') {
          throw new Error("Product's Price can not be 0 or empty");
        }
      }
    ],
    update: [
      context => {
        if(context.data.product_name.trim() === '') {
          throw new Error("Product's Name can not be empty");
        }
        if(context.data.distributor.trim() === '') {
          throw new Error("Product's Distributor can not be empty");
        }
        if(context.data.price.trim() === '' || context.data.price.trim() === '0') {
          throw new Error("Product's Price can not be 0 or empty");
        }
      }
    ],
    patch: [
      context => {
        if(context.data.product_name.trim() === '') {
          throw new Error("Product's Name can not be empty");
        }
        if(context.data.distributor.trim() === '') {
          throw new Error("Product's Distributor can not be empty");
        }
        if(context.data.price.trim() === '' || context.data.price.trim() === '0') {
          throw new Error("Product's Price can not be 0 or empty");
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
              service: 'distributors',
              nameAs: 'distributor',
              parentField: 'distributor',
              childField: '_id',
              query: {
                $select: ['name']
              }
            },
            {
              service: 'purchase',
              nameAs: 'purchase',
              parentField: '_id',
              childField: 'product',
              query: {
                $select: ['qty'] 
              }
            }
          ]
        }
      }),
      async context => {
        const { Model } = context.app.service('sales');
        const listSales = await Model.aggregate([ 
          { $unwind: '$list' },
          { $project: { list: 1, product: 1, idProduct: { product: '$list.product' } } },
          { $group: { _id: '$list.product', sales: { $sum: '$list.qty' } } } ]);

        let result;
        if (context.result.data===undefined) {
          result = context.result;
          const purchase = context.result.purchase;
          
          let stock = 0;
          if (purchase!=null) {
            if (purchase.qty!=null) {
              stock += purchase.qty;
            } else {
              purchase.forEach( function(val) { 
                stock += val.qty;
              })  
            }
          };

          const checkSales = _.find(listSales, { '_id': result._id });
          result.sales = checkSales.sales;
          result.stock = stock - checkSales.sales;
        } else {
          result = context.result.data;
          result.forEach( function(val) {
            const purchase = val.purchase;
          
            let stock = 0;
            if (purchase!=null) {
              if (purchase.qty!=null) {
                stock += purchase.qty;
              } else {
                purchase.forEach( function(val) { 
                  stock += val.qty;
                })  
              }
            };

            const checkSales = _.find(listSales, {'_id': val._id});
            val.sales = checkSales.sales;
            val.stock = stock - checkSales.sales;
          })
        }
        return context;
      }
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
