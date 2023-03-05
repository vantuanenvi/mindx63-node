const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,

  },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.toJSON = function() {
    const users = this._doc;
    delete users.password;
    delete users.isDeleted;
    return users
}

userSchema.methods.generateToken = async function() {
    const accessToken = await jwt.sign({ _id:this._id}, JWT_SECRET_KEY, {
        expiresIn:"1d",
    });
    return accessToken;
}
const User = mongoose.model("User", userSchema);

module.exports = User;