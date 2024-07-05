import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findUser(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signin(user: any) {
    const userData = await this.userService.findOne(user?._doc._id);
    const payload = {
      sub: userData._id,
    };
    return {
      access_Token: this.jwtService.sign(payload),
      user: userData,
    };
  }
}
