import userSchema from "../database/model/userModel.js";

const serviceFindEmail = async (email) => {
  console.log(
    "<<===================== SERVICE FIND-ONE by EMAIL =======================>>"
  );
  return await userSchema.findOne({ email });
};

const serviceFindId = async (id) => {
  console.log(
    "<<===================== SERVICE FIND-ONE by ID =======================>>"
  );
  return await userSchema.findOne({ _id: id });
};

const serviceResetPassword = async (filter, updateData, option) => {
  console.log(
    "<<===================== SERVICE RESET PASSWORD =======================>>"
  );
  return await userSchema.updateOne(filter, updateData, option); // updating specific user data in DB.
};

export { serviceFindEmail, serviceFindId, serviceResetPassword };
