import { User } from '../models/user';
import bcrypt from 'bcrypt'
import { TokenService } from './token';
import { UserDto } from '../dtos/user-dto';

const tokenService = new TokenService()

export class UserService {
  async registration(email: string, password: string, firstName: string, lastName: string) {
    const candidate = await User.findOne({email})

    if(candidate) {
      throw new Error('User with this email already exist')
    }

    const hashPassword = await bcrypt.hash(password, 5)

    const user = await User.create({email, password: hashPassword, lastName, firstName})

    const userDto = new UserDto(user)

    const tokens = tokenService.generateTokens({...userDto})

    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto
    }
  }

  async login(email: string, password: string) {
    const user = await User.findOne({email})
    if (!user) {
      throw new Error('User with this email not found')
    }

    const isPasswordEqual = await bcrypt.compare(password, user.password)

    if (!isPasswordEqual) {
      throw new Error('Wrong password')
    }

    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({...userDto})
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto
    }
  }

  async logout(refreshToken?: string) {
    const token = await tokenService.removeToken(refreshToken)
    return token
  }

  async refresh(refreshToken?: string) {
    if(!refreshToken) {
      throw new Error('Unauthorized user')
    }
    
    const verUserData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDB = await tokenService.findToken(refreshToken)

    if (!verUserData || !tokenFromDB) {
      throw new Error('Unauthorized user')
    }
    
    const user = await User.findById(verUserData.id)

    if(!user) {
      return
    }

    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({...userDto})
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens
    }
  }

  async getUser(id: string) {
    
    if (!id) {
      throw new Error('UnAuthorized user')
    }

    const user = await User.findById(id)

    if(!user) {
      return
    }

    const userDto = new UserDto(user)
    return {...userDto}
  }
}
