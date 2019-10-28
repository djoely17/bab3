// Initializes the `userDetail` service on path `/user-detail`
const { UserDetail } = require('./user-detail.class');
const hooks = require('./user-detail.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/user-detail', new UserDetail(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('user-detail');

  service.hooks(hooks);
};
