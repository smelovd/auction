import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin-user.dto';
import { SignUpDto } from './dto/signup-user.dto';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiNotFoundResponse({
    type: "Entity/ies not found!"
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto): Promise<string> {
    return this.authService.signIn(signInDto);
  }

  @ApiNotFoundResponse({
    type: "Entity/ies not found!"
  })
  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() signUpDto: SignUpDto): Promise<string>  {
    return this.authService.signUp(signUpDto);
  }
}
