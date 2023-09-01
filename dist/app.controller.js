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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("./supabase/supabase.service");
const supabase_guard_1 = require("./supabase/supabase.guard");
let AppController = class AppController {
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
    }
    async signup(body) {
        try {
            const { email, password } = body;
            if (!email || !password) {
                throw new common_1.HttpException('Email and password are required', common_1.HttpStatus.BAD_REQUEST);
            }
            const supabase = await this.supabaseService.getClient();
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });
            if (error) {
                throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
            }
            console.log("result--> ", data);
            return { message: 'User registered successfully', data };
        }
        catch (error) {
            throw new common_1.BadRequestException("Signup failed", error.message);
        }
    }
    async login(body) {
        try {
            const { email, password } = body;
            if (!email || !password) {
                throw new common_1.HttpException('Email and password are required', common_1.HttpStatus.BAD_REQUEST);
            }
            const supabase = await this.supabaseService.getClient();
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) {
                throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
            }
            return { message: 'Login successful', data };
        }
        catch (error) {
            throw new common_1.BadRequestException('Login failed', error.message);
        }
    }
    async updateUser(body) {
        try {
            const { data } = body;
            if (!data) {
                throw new common_1.HttpException('User data is required', common_1.HttpStatus.BAD_REQUEST);
            }
            const supabase = await this.supabaseService.getClient();
            const result = await supabase.auth.updateUser(data);
            return result;
        }
        catch (error) {
            throw new common_1.BadRequestException('Update failed', error.message);
        }
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Post)('auth/signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('auth/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(supabase_guard_1.SupabaseGuard),
    (0, common_1.Post)('auth/update-user'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "updateUser", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], AppController);
//# sourceMappingURL=app.controller.js.map