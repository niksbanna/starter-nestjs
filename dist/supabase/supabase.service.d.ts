import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { SupabaseClient } from '@supabase/supabase-js';
export declare class SupabaseService {
    private readonly request;
    private readonly configService;
    private clientInstance;
    constructor(request: Request, configService: ConfigService);
    getClient(): Promise<SupabaseClient<any, "public", any>>;
}
