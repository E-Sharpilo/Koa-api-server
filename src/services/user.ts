import { User } from '../models/user';
import bcrypt from 'bcrypt'
import { TokenService } from './token';
import { UserDto } from '../dtos/user-dto';

const tokenService = new TokenService()

export class UserService {
  async registration(email: string, password: string) {
    const candidate = await User.findOne({email})

    if(candidate) {
      throw new Error('User with this email already exist')
    }

    const hashPassword = await bcrypt.hash(password, 3)
    const user = await User.create({email, password: hashPassword})

    const userDto = new UserDto(user)

    const tokens = tokenService.generateTokens({...userDto})

    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      userDto
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
      userDto
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
    
  }
}
