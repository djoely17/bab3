const users = require('./users/users.service.js');
const products = require('./products/products.service.js');
const distributors = require('./distributors/distributors.service.js');
const customers = require('./customers/customers.service.js');
const sales = require('./sales/sales.service.js');
const purchase = require('./purchase/purchase.service.js');
const profil = require('./profil/profil.service.js');
const productDistributor = require('./product-distributor/product-distributor.service.js');
const userDetail = require('./user-detail/user-detail.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(products);
  app.configure(distributors);
  app.configure(customers);
  app.configure(sales);
  app.configure(purchase);
  app.configure(profil);
  app.configure(productDistributor);
  app.configure(userDetail);
};