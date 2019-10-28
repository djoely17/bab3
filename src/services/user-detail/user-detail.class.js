/* eslint-disable no-unused-vars */
const _ = require('lodash'); 

exports.UserDetail = class UserDetail {
  constructor (options) {
    this.options = options || {};
  }

  setup(app) {
    this.app = app;
  }

  async find (params) {
    const users = await this.app.service('users').find({ });
    const profil = await this.app.service('profil').find({ });

    users.data.forEach( function(val) {
      const checkProfil = _.find(profil.data, { 'idUser': val._id});
      if (checkProfil===undefined) {
        val.profil = null;  
      } else {
        val.profil = checkProfil;
      }
    })

    return users;
  }

  async get (id, params) {
    const users = await this.app.service('users').get(id);
    const profil = await this.app.service('profil').find({ });

    const checkProfil = _.find(profil.data, { 'idUser': users._id});
    if (checkProfil===undefined) {
      users.profil = null;  
    } else {
      users.profil = checkProfil;
    }

    return users;
  }

  async create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    return { id };
  }
}
