import { Types } from "mongoose";

export class UserDto {

  constructor(model: {email: string, _id: Types.ObjectId, lastName: string, firstName: string}) {
    this.email = model.email;
    this.id = model._id;
    this.firstName = model.firstName;
    this.lastName = model.lastName;
  }

  email;
  id;
  lastName;
  firstName;
}