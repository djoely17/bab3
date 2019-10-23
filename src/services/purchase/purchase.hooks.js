const { authenticate } = require('@feathersjs/authentication').hooks;
const { populate } = require('feathers-hooks-common');
const _ = require('lodash'); 

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
      async context => {
        const { Model } = context.app.service('products')
        const listProduct = await Model.aggregate([ { $project: { name: '$product_name' } } ]);

        let result;
        if (context.result.data===undefined) {
          result = context.result;
          const checkProduct = _.find(listProduct, {'_id': result.product});
          result.productName = checkProduct.name;
        } else {
          result = context.result.data;
          _.forEach(result, function(value, key) {
            const checkProduct = _.find(listProduct, {'_id': value.product});  
            value.productName = checkProduct.name;
          });
        }
        return context;
      },
      populate({
        schema: {
          include: [
            {
              service: 'profil',
              nameAs: 'profil',
              parentField: 'user',
              childField: 'idUser'
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
