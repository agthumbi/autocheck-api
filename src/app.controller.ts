import { Controller, Get,  Header,  Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import * as dotenv from 'dotenv';
dotenv.config();
@Controller()
export class AppController {
  constructor(private readonly appService: AppService,private readonly authService:AuthService) {}
 
  @Get()  
  getHello():string {
    return this.appService.getHello();
  }
  @UseGuards(LocalAuthGuard)
  @Header('Content-Type','application/json') 
  @Post('auth/login')
  async login(@Request() req) {
    console.log(req)
    return this.authService.login(req.user);
  }
}
