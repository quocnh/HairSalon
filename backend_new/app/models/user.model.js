// create a new User: object.save()
// find a User by id: User.findById(id)
// find User by email: User.findOne({ email: … })
// find User by username: User.findOne({ username: … })
// find all Roles which name in given roles array: Role.find({ name: { $in: roles } })


const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);

module.exports = User;


