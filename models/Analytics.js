const db = require('../config/db');

const Model = db.model('Analytics', {
  timeAccessed:{
    type: Date,
    default: Date.now
  },
  ipAddress:{
    type:String,
    default: ''
  },
  location:{
    type:String,
    default:''
  },
  service:{
    type:String,
    default:''
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
  return await Model.find({});

}

async function create(fields) {
  const model = new Model(fields);
  await model.save();
}


module.exports = {
  get,
  create,
  getAll,
  model: Model
}