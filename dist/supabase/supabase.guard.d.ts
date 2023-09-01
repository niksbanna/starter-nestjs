import { ExecutionContext } from '@nestjs/common';
import { SupabaseService } from './supabase.service';
declare const SupabaseGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class SupabaseGuard extends SupabaseGuard_base {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export {};
