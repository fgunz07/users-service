import { Model, Schema, model } from "mongoose";
import { hashPassword } from "../../../../utils";

export interface IUser {
  firstName: string;
  middleName?: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  address: {
    country: string;
    province: string;
    city: string;
    postal: number;
  }
}

interface IUserMethods {}

type UserModel = Model<IUser, {}, IUserMethods>;

const schema = new Schema<IUser, UserModel, IUserMethods>({
  firstName: { type: String, required: true },
  middleName: { type: String, required: false },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  address: {
    country: { type: String, required: true },
    province: { type: String, required: true },
    city: { type: String, required: true },
    postal: { type: String, required: true },
  },
}, {
  timestamps: true
});

schema.pre("save", async function(next) {
  this.password = await hashPassword(this.password) as string;
  next();
});

const User = model<IUser, UserModel>("User", schema);

export default User;
