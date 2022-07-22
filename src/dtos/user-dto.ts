import { Types } from "mongoose";

export class UserDto {

  constructor(model: {email: string, _id: Types.ObjectId}) {
    this.email = model.email;
    this.id = model._id;
  }

  email;
  id;
}