const { Schema, Types, model } = require("mongoose");
 
const ColorSchema = new Schema({
  name: {type: String},
  range: [],
  user: {type: Types.ObjectId},
});

ColorSchema.set("toJSON", {
  transform: (document, returnedObject)=> {
    returnedObject.id = returnedObject._id;
    delete returnedObject.user;
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})

module.exports = model("color", ColorSchema);