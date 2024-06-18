import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signin-user.dto';
import { User } from 'src/users/entities/user.entity';
import { SignUpDto } from './dto/signup-user.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<string> {
    const user = await this.usersService.findOneByUsername(signInDto.username);
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      if (user?.password !== hashedPassword) {
        this.logger.warn('User authorization failed!');
        throw new UnauthorizedException();
      }
      const payload = { sub: user.id, username: user.username };
      const access_token = await this.jwtService.signAsync(payload);
      this.logger.log('User with id: ' + user.id + ', logged success!');
      return access_token;
    } catch (e) {
      this.logger.warn('User logged failed!');
      throw new UnauthorizedException();
    }
  }

  async signUp(signUpDto: SignUpDto): Promise<string>  {
    const hashedPassword = await bcrypt.hash(signUpDto.password, 10);
    const user: User = {
      id: null,
      username: signUpDto.username,
      password: hashedPassword,
      bids: [],
      items: [],
    };
    await this.usersService.insert(user);
    try {
      const payload = { sub: user.id, username: user.username };
      const access_token = await this.jwtService.signAsync(payload);
      this.logger.log('User with id: ' + user.id + ', logged success!');
      return access_token;
    } catch (e) {
      this.logger.warn('User with id: ' + user.id + ', logged failed!');
      throw new UnauthorizedException();
    }
  }
}
