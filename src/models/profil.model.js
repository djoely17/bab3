// profil-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const profil = new Schema({
    _id: { type: Schema.Types.ObjectId, ref: "Users" },
    name: { type: String, required: true },
    idCard: { type: Number, required: true },
    gender: { type: String, required: true },
    role: { type: String, required: true }
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://github.com/Automattic/mongoose/issues/1251
  try {
    return mongooseClient.model('profil');
  } catch (e) {
    return mongooseClient.model('profil', profil);
  }
};
