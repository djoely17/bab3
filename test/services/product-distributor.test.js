const assert = require('assert');
const app = require('../../src/app');

describe('\'productDistributor\' service', () => {
  it('registered the service', () => {
    const service = app.service('product-distributor');

    assert.ok(service, 'Registered the service');
  });
});
