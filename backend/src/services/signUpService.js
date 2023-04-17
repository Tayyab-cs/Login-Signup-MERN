import userSchema from "../database/model/userModel.js";

const serviceCreateUser = async (data) => {
  return await userSchema.create(data); // creating user in DB.
};

const serviceGetAll = async () => {
  return await userSchema.find(); // getting all user from DB.
};

const serviceFindUser = async (email) => {
  return await userSchema.findOne({ email }); //  getting specific user from DB.
};

const serviceUpdateUser = async (filter, updateData, option) => {
  return await userSchema.updateOne(filter, updateData, option); // updating specific user data in DB.
};

export { serviceCreateUser, serviceGetAll, serviceFindUser, serviceUpdateUser };
