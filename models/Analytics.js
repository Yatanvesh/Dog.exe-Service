const db = require('../config/db');

const Model = db.model('Analytics', {
  timeAccessed: {
    type: Date,
    default: Date.now
  },
  ip: {
    type: String,
    default: ''
  },
  city: {
    type: String,
    default: ''
  },
  country: {
    type: String,
    default: ''
  },
  region: {
    type: String,
    default: ''
  },
  ll:{
    type:Array,
    default:[]
  },
  service: {
    type: String,
    default: ''
  }
});

async function get(_id) {
  const model = await Model.findOne(
    {_id},
    {__v: 0}
  );
  return model;
}

async function getAll() {
  return await Model.find({}).sort({timeAccessed: -1});
}


async function getDogs() {
  return await Model.find({service: 'Dog'}).sort({timeAccessed: -1});
}

async function create(fields) {
  const model = new Model(fields);
  await model.save();
}

async function count() {
  return await Model.countDocuments();
}


module.exports = {
  get,
  create,
  getAll,
  count,
  getDogs,
  model: Model
}