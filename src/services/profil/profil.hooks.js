const { authenticate } = require('@feathersjs/authentication').hooks;
const { populate } = require('feathers-hooks-common');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [
      async context => {
        if(context.data.idUser.trim() === '') {
          throw new Error("ID User can not be empty");
        }
        if(context.data.name.trim() === '') {
          throw new Error("Name can not be empty");
        }
        if(context.data.idCard.trim() === '') {
          throw new Error("ID Card can not be empty");
        }
        if(context.data.gender.trim() === '') {
          throw new Error(" Gender can not be empty");
        }
      }
    ],
    update: [
      async context => {
        if(context.data.idUser.trim() === '') {
          throw new Error("ID User can not be empty");
        }
        if(context.data.name.trim() === '') {
          throw new Error("Name can not be empty");
        }
        if(context.data.idCard.trim() === '') {
          throw new Error("ID Card can not be empty");
        }
        if(context.data.gender.trim() === '') {
          throw new Error(" Gender can not be empty");
        }
      }
    ],
    patch: [
      async context => {
        if(context.data.idUser.trim() === '') {
          throw new Error("ID User can not be empty");
        }
        if(context.data.name.trim() === '') {
          throw new Error("Name can not be empty");
        }
        if(context.data.idCard.trim() === '') {
          throw new Error("ID Card can not be empty");
        }
        if(context.data.gender.trim() === '') {
          throw new Error(" Gender can not be empty");
        }
      }
    ],
    remove: []
  },

  after: {
    all: [],
    find: [
      populate({
        schema: {
          include: [
            {
              service: 'users',
              nameAs: 'user',
              parentField: 'idUser',
              childField: '_id'
            }
          ]
        }
      })
    ],
    get: [
      populate({
        schema: {
          include: [
            {
              service: 'users',
              nameAs: 'user',
              parentField: 'idUser',
              childField: '_id'
            }
          ]
        }
      })
    ],
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
