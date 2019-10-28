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
                                                $and: [
                                                  { $eq: ['$_id', '$id'] }
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
                                        profilUser: "$profilUser"
                                      }
                                    }
                                  ]);
    
    // const data1 = await this.app.service('distributors').find({ query: { $populate: { path: "distributor", model: Product, as: "product" } } });
    return data;
  }

  async get (id, params) {
    const ObjectId = require('mongoose').Types.ObjectId;
    const distributor = this.app.service('users').Model;
    const data = await distributor
                       .aggregate([ 
                                    { $match: { "_id": ObjectId(id) } },
                                    { 
                                      $lookup: {
                                        from: "profil",
                                        as: "profil",
                                        let: { "id": '$_id' },
                                        pipeline: [
                                          {
                                            $match: { //'idUser': '5d9f01b66b830d22709b6891'
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
                                    // { $unwind: "$profilUser"},
                                    {
                                      $project: { 
                                        _id: "$_id",
                                        email: "$email",
                                        role: "$role",
                                        profilUser: "$profil"
                                      }
                                    }
                                  ]);
    
    // const Profil = require('mongoose').model(profil, );
    // const data1 = await this.app.service('users')
    //                     .find({ query: { 
    //                               $populate: { path: "idUser", model: "Profil", as: "product", $select: ['name'] }, 
    //                               $select: ['name']  
    //                             } 
    //                           });
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
