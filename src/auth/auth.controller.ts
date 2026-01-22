import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  login() {
    return this.authService.login({
      id: 1,
      email: 'admin@mail.com',
      role: 'admin',
    });
  }
}
