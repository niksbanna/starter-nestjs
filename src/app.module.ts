import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SupabaseStrategy } from './supabase/supabase.stretagy';
import { SupabaseGuard } from './supabase/supabase.guard';
import { SupabaseService } from './supabase/supabase.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, SupabaseStrategy, SupabaseGuard, SupabaseService],
})
export class AppModule { }
