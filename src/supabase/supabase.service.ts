import { Inject, Injectable, Scope } from '@nestjs/common';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { ExtractJwt } from 'passport-jwt';

@Injectable({ scope: Scope.REQUEST })
export class SupabaseService {
    private clientInstance: SupabaseClient;

    constructor(
        @Inject(REQUEST) private readonly request: Request,
        private readonly configService: ConfigService,
    ) { }

    async getClient() {
        if (this.clientInstance) {
            return this.clientInstance;
        }

        this.clientInstance = createClient<any>(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_KEY,
            {
                auth: {
                    persistSession: false,
                },
                global: {
                    headers: {
                        Authorization: `Bearer ${ExtractJwt.fromAuthHeaderAsBearerToken()(
                            this.request,
                        )}`,
                    },
                },
            },
        );
        return this.clientInstance;
    }
}
