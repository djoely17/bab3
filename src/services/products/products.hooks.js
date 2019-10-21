const { authenticate } = require('@feathersjs/authentication').hooks;
const { populate } = require('feathers-hooks-common');

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
    all: [],
    find: [
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
            },
            {
              service: 'sales',
              nameAs: 'sales',
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
        const result = context.result.data;
        
        if (result!=null) {
          result.forEach( function(val) {
            const purchase = val.purchase;
            const sales = val.sales;

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

            if (sales!=null) {
              if (sales.qty!=null) {
                stock -= sales.qty;
              } else {
                sales.forEach( function(val) { 
                  stock -= val.qty;
                })  
              }
            };

            val.stock = stock;
          })
          // return context;
        } else {
          const purchase = context.result.purchase;
          const sales = context.result.sales;

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

          if (sales!=null) {
            if (sales.qty!=null) {
              stock -= sales.qty;
            } else {
              sales.forEach( function(val) { 
                stock -= val.qty;
              })  
            }
          };

          context.result.stock = stock;
        }
        return context;
      }
    ],
    get: [
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
            },
            {
              service: 'sales',
              nameAs: 'sales',
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
        const result = context.result.data;
        
        if (result!=null) {
          result.forEach( function(val) {
            const purchase = val.purchase;
            const sales = val.sales;

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

            if (sales!=null) {
              if (sales.qty!=null) {
                stock -= sales.qty;
              } else {
                sales.forEach( function(val) { 
                  stock -= val.qty;
                })  
              }
            };

            val.stock = stock;
          })
          // return context;
        } else {
          const purchase = context.result.purchase;
          const sales = context.result.sales;

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

          if (sales!=null) {
            if (sales.qty!=null) {
              stock -= sales.qty;
            } else {
              sales.forEach( function(val) { 
                stock -= val.qty;
              })  
            }
          };

          context.result.stock = stock;
        }
        return context;
      }
    ],
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
