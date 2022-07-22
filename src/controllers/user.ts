import { UserService } from "../services/user";
import { Context } from "koa";
import Joi from 'joi';

const requestSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(5).max(20) 
})

const userService = new UserService();

export const registration = async (ctx: Context) => {

  try {
    const request = ctx.request.body;

    const validateRequest = await requestSchema.validateAsync(request)

    const userData = await userService.registration(validateRequest.email, validateRequest.password);

    ctx.cookies.set("refreshToken", userData.refreshToken, {
      maxAge: 2592000000,
      httpOnly: true,
    });
    ctx.response.status = 200;
    ctx.response.body = userData;
  } catch (error) {
    console.log(error);
    ctx.response.status = 400;
    ctx.response.body = `Bad Request, ${error}`;
  }
};
