/* eslint-disable no-unused-vars */
const Service = require('feathers-mongoose');
const populate = require('feathers-hooks-common');

exports.UserDetail = class UserDetail {
  constructor (options) {
    this.options = options || {};
  }

  setup(app) {
    this.app = app;
  }

  async find (params) {
    const ObjectId = require('mongoose').Types.ObjectId;
    const userList = this.app.service('users').Model;
    const data = await userList
                       .aggregate([{ 
                                    $lookup: {
                                      from: "profil",
                                      as: "profilUser",
                                      let: { "id": '$_id' },
                                      pipeline: [
                                        {
                                          $match: {
                                            $expr: {
                                              $eq: ['$idUser', '$$id'] 
                                            }
                                          }
                                        }
                                      ]
                                    },  
                                  },
                                  {
                                    $project: { 
                                      _id: "$_id",
                                      email: "$email",
                                      role: "$role",
                                      profilUser: "$profilUser"
                                    }
                                  }
                                ]);
    
    // const data1 = await this.app.service('distributors').find({ query: { $populate: { path: "distributor", model: 'product', as: "product" } } });
    return data;
  }

  async get (id, params) {
    const ObjectId = require('mongoose').Types.ObjectId;
    const distributor = this.app.service('users').Model;
    const data = await distributor
                       .aggregate([{ $match: { "_id": ObjectId(id) } },
                                  { 
                                    $lookup: {
                                      from: "profil",
                                      as: "profil",
                                      let: { "id": '$_id' },
                                      pipeline: [
                                        {
                                          $match: { 
                                            $expr: {
                                              $and: [ 
                                                { $eq: ["$_id", "$$id"] }
                                              ]
                                            }
                                          }
                                        }
                                      ]
                                    },  
                                  },
                                  {
                                    $project: { 
                                      _id: "$_id",
                                      email: "$email",
                                      role: "$role",
                                      profilUser: "$profil"
                                    }
                                  }
                                ]);
    
    return data;
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
