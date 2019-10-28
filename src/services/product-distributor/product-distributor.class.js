/* eslint-disable no-unused-vars */
exports.ProductDistributor = class ProductDistributor {
  constructor (options) {
    this.options = options || {};
  }

  setup(app) {
    this.app = app;
  } 

  async find (params) {
    const distributor = this.app.service('distributors').Model;
    const data = await distributor
                       .aggregate([{ 
                                    $lookup: {
                                      from: "products",
                                      as: "daftarProduct",
                                      let: { "id": '$_id' },
                                      pipeline: [
                                        {
                                          $match: { 
                                            $expr: {
                                              $eq: ['$distributor', '$$id'] 
                                            }
                                          }
                                        }
                                      ]
                                    },  
                                  },
                                  {
                                    $project: { 
                                      _id: "$_id",
                                      name: "$name",
                                      daftarProduct: "$daftarProduct"
                                    }
                                  }
                                ]);
    
    // const data1 = await this.app.service('distributors').find({ query: { $populate: { path: "distributor", model: "products", as: "product" } } });
    return data;
  }

  async get (id, params) {
    const ObjectId = require('mongoose').Types.ObjectId;
    const distributor = this.app.service('distributors').Model;
    const data = await distributor
                       .aggregate([{ $match: { "_id": ObjectId(id) } },
                                  { 
                                    $lookup: {
                                      from: "products",
                                      as: "daftarProduct",
                                      let: { "id": '$_id' },
                                      pipeline: [
                                        {
                                          $match: {
                                            $expr: {
                                              $eq: ['$distributor', '$$id'] 
                                            }
                                          }
                                        }
                                      ]
                                    },  
                                  },
                                  {
                                    $project: { 
                                      _id: "$_id",
                                      name: "$name",
                                      daftarProduct: "$daftarProduct"
                                    }
                                  }
                                ]);
    
    // const data1 = await this.app.service('distributors').find({ query: { $populate: { path: "distributor", model: Product, as: "product" } } });
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
