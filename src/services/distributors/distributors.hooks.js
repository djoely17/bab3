const { authenticate } = require('@feathersjs/authentication').hooks;
const { populate } = require('feathers-hooks-common');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [
      // populate({
      //   schema: {
      //     include: [
      //       {
      //         service: 'products',
      //         nameAs: 'product',
      //         parentField: '_id',
      //         childField: 'distributor',
      //         query: {
      //           $select: { 
      //             product_name: ['product_name'], 
      //             price: ['price'] 
      //           }
      //         }
      //       }
      //     ]
      //   }
      // })
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
