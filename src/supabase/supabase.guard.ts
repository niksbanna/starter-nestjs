import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';
import { SupabaseService } from './supabase.service';

@Injectable()
export class SupabaseGuard extends AuthGuard('jwt') {
    constructor(private readonly supabaseService: SupabaseService) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        // Use the Supabase service to obtain the client and validate the token
        const supabase = await this.supabaseService.getClient();

        const authHeader = request.headers['authorization'];

        if (!authHeader) {
            throw new UnauthorizedException('Authorization header is missing');
        }

        const token = authHeader.replace('Bearer ', '');

        // Validate the JWT token using Supabase client
        const { user, error }: any = await supabase.auth.getUser(token);

        if (error) {
            throw new UnauthorizedException('Invalid token');
        }

        // Set the user on the request for later use in controllers
        request.user = user;

        return true;
    }
}
