// Initializes the `profil` service on path `/profil`
const { Profil } = require('./profil.class');
const createModel = require('../../models/profil.model');
const hooks = require('./profil.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/profil', new Profil(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('profil');

  service.hooks(hooks);
};
