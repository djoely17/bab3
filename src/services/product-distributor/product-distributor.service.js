// Initializes the `productDistributor` service on path `/product-distributor`
const { ProductDistributor } = require('./product-distributor.class');
const hooks = require('./product-distributor.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/product-distributor', new ProductDistributor(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('product-distributor');

  service.hooks(hooks);
};
