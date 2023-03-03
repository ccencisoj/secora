const { ObjectId } = require("mongoose").Types;

const generateUserId = ()=> new ObjectId().toString()

module.exports = generateUserId;