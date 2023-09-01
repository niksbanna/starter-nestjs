import { SupabaseService } from './supabase/supabase.service';
export declare class AppController {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
    signup(body: any): Promise<{
        message: string;
        data: {
            user: import("@supabase/gotrue-js").User;
            session: import("@supabase/gotrue-js").Session;
        } | {
            user: null;
            session: null;
        };
    }>;
    login(body: any): Promise<{
        message: string;
        data: {
            user: import("@supabase/gotrue-js").User;
            session: import("@supabase/gotrue-js").Session;
        } | {
            user: null;
            session: null;
        };
    }>;
    updateUser(body: any): Promise<import("@supabase/gotrue-js").UserResponse>;
}
