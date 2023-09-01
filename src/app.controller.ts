import { Body, Controller, Post, HttpException, HttpStatus, BadRequestException, UseGuards } from '@nestjs/common';
import { SupabaseService } from './supabase/supabase.service';
import { SupabaseGuard } from './supabase/supabase.guard';

@Controller()
export class AppController {
  constructor(private readonly supabaseService: SupabaseService) { }

  @Post('auth/signup')
  async signup(@Body() body: any) {
    try {
      const { email, password } = body;
      if (!email || !password) {
        throw new HttpException('Email and password are required', HttpStatus.BAD_REQUEST);
      }

      const supabase = await this.supabaseService.getClient();

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }

      console.log("result--> ", data);
      return { message: 'User registered successfully', data };
    } catch (error) {
      throw new BadRequestException("Signup failed", error.message);
    }
  }

  @Post('auth/login')
  async login(@Body() body: any) {
    try {
      const { email, password } = body;
      if (!email || !password) {
        throw new HttpException('Email and password are required', HttpStatus.BAD_REQUEST);
      }

      const supabase = await this.supabaseService.getClient();

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }

      return { message: 'Login successful', data };
    } catch (error) {
      throw new BadRequestException('Login failed', error.message);
    }
  }

  @UseGuards(SupabaseGuard)
  @Post('auth/update-user')
  async updateUser(@Body() body: any) {
    try {
      const { data } = body;

      if (!data) {
        throw new HttpException('User data is required', HttpStatus.BAD_REQUEST);
      }

      // Get the Supabase client from your service.
      const supabase = await this.supabaseService.getClient();

      // Use the appropriate Supabase method to update user information.
      const result = await supabase.auth.updateUser(data);
      return result;
      // if (error) {
      //   throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      // }

      // return { message: 'User information updated successfully', data: updatedData };
    } catch (error) {
      throw new BadRequestException('Update failed', error.message);
    }
  }

}
