const db = require('../config/db');

const Model = db.model('Thigh', {
  _id: {
    type: String,
    required: true,
  }
});

async function get(_id) {
  const model = await Model.findOne(
    {_id},
    {__v: 0}
  );
  return model;
}

async function getRandom() {
  let count = await Model.countDocuments();
  const random = Math.floor(Math.random() * count);
  let randomDoc = await Model.findOne().skip(random);
  const url = randomDoc._id;
  await remove(url);
  return url;
}
async function getRemaining() {
  return await Model.countDocuments();
}

async function create(url) {
  let existingModel = await get(url);
  if (existingModel) return;
  const model = new Model({_id: url});
  await model.save();
}

async function remove(_id) {
  const model = await get(_id);
  if (!model) throw new Error("No thigh found");
  await Model.deleteOne({
    _id
  });
  return true;
}

module.exports = {
  get,
  create,
  getRandom,
  getRemaining,
  model: Model
}