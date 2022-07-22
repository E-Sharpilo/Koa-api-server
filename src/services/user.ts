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

  async login() {
    console.log('login');
  }

  async logout() {
    console.log('logout');
  }

  async refresh() {
    console.log('refresh');
    
  }
}
