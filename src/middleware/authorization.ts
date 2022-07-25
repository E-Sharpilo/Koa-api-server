import { Context } from "koa";
import { TokenService } from "../services/token";

const tokenService = new TokenService()

export function authorization (ctx: Context, next: any) {
  try {
    const authorizationHeader = ctx.headers.authorization;

    console.log('header', authorizationHeader);
    
    if(!authorizationHeader) {
      return ctx.status = 401, new Error('Unauthorized Error')
    }
  
    const authorizationToken = authorizationHeader.split(' ')[1]
    console.log('token', authorizationToken);
  
    if (!authorizationToken) {
      return ctx.status = 401, new Error('You don\'t have access token')
    }
  
    const userData = tokenService.validateAccessToken(authorizationToken)
    console.log('user data', userData);
  
    if (!userData) {
      return ctx.status = 401, new Error('Access token not valid')
    }
  
    return ctx.request.body.user = userData, next();

  } catch (error) {
    
    return ctx.status = 401, error
  }

}