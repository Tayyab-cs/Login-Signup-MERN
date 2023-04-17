import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    email: {
      required: [true, "Email is required."],
      type: String,
      unique: true,
    },
    password: {
      required: [true, "Password is required."],
      type: String,
    },
    active: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

// userSchema.pre("save", async function (next) {
//   console.log("<<===================== PRE SAVE =======================>>");
//   try {
//     const saltRound = 11;
//     const hashedPassword = await bcrypt.hash(this.password, saltRound);
//     console.log(this.password);
//     console.log(`HashedPassword: ${hashedPassword}`);

//     this.password = hashedPassword;
//     console.log(this.password);

//     next();
//   } catch (error) {
//     return next(error);
//   }
// });

userSchema.pre("findOneAndUpdate", async function (next) {
  console.log(
    "<<===================== PRE FIND-ONE-AND-UPDATE =======================>>"
  );
  try {
    if (this._update.password) {
      const hashedPassword = await bcrypt.hash(this._update.password, 10);
      console.log(`UPDATED HASHED PASSWORD: ${hashedPassword}`);

      this._update.password = hashedPassword;
    }
    next();
  } catch (error) {
    return next(error);
  }
});

const userModel = mongoose.model("signUp", userSchema);
export default userModel;
