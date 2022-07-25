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
    ctx.response.status = 400;
    ctx.response.body = `Bad Request, ${error}`;
  }
};

export const login = async (ctx: Context) => {  
  try {
    const {email, password} = ctx.request.body;
    const userData = await userService.login(email, password);

    ctx.cookies.set("refreshToken", userData.refreshToken, {
      maxAge: 2592000000,
      httpOnly: true,
    });

    ctx.response.body = userData;

  } catch (error) {
    ctx.response.status = 400;
    ctx.response.body = `Bad Request, ${error}`;
  }
}

export const logout = async (ctx: Context) => {
  const refreshToken = ctx.cookies.get('refreshToken')
  console.log(refreshToken);
  
  const token  = await userService.logout(refreshToken)
  ctx.cookies.set("refreshToken", null)

  return ctx.status = 200
} 

export const refresh = async (ctx: Context) => {
  const refreshToken = ctx.cookies.get('refreshToken')
  const userData = await userService.refresh(refreshToken)

  if(!userData) {
    throw new Error('something wrong')
  }

  ctx.cookies.set("refreshToken", userData.refreshToken, {
    maxAge: 2592000000,
    httpOnly: true,
  });

  ctx.response.status = 200;
  ctx.response.body = userData;
}