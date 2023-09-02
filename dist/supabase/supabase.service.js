"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const supabase_js_1 = require("@supabase/supabase-js");
const passport_jwt_1 = require("passport-jwt");
let SupabaseService = class SupabaseService {
    constructor(request, configService) {
        this.request = request;
        this.configService = configService;
    }
    async getClient() {
        if (this.clientInstance) {
            return this.clientInstance;
        }
        this.clientInstance = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_KEY, {
            auth: {
                persistSession: false,
            },
            global: {
                headers: {
                    Authorization: `Bearer ${passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken()(this.request)}`,
                },
            },
        });
        return this.clientInstance;
    }
};
exports.SupabaseService = SupabaseService;
exports.SupabaseService = SupabaseService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __param(0, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [Object, config_1.ConfigService])
], SupabaseService);
//# sourceMappingURL=supabase.service.js.map