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
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    firstname: { 
      type: String,
      required: [false, 'firstname']
    },

    lastname: { 
        type: String,
        required: [false, 'lastname']
    },
    
    phone: {
        type: String,
        required: [false, 'Phone number must be provided']
    },
    email: {
        type: String,
        lowercase: false,
        required: [false, "can't be blank"], 
        match: [/\S+@\S+\.\S+/, 'is invalid']
    },
    dob: { 
        type: Date,
        required: [false, 'Date of birth must be provided']
    },
    gender: { 
        type: String , 
        required: [false, 'Gender must be provided']
    },
    district: { 
        type: String,
        required: [false, 'district']
    },
    city: { 
        type: String,
        required: [false, 'city']
    },
    address: { 
        type: String,
        required: [false, 'address']
    },
    avatar: {
        type: String,
        require: [false, 'profile avatar']
    },
    isActivated: {
      type: Boolean,
      default: false,      
      require: [false, 'is Activated']
    }
  })
);

module.exports = User;


