import mongoose, { Schema } from "mongoose";

const usersSchema = new Schema(
  {
    name:{
        type:String,
        require: true,
    },
    email:{
        type: String,
        require:true,
        unique: true
    },
    password:{
        type:String,
        require: true
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("Users", usersSchema);

export default User;