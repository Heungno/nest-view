"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@nestjs/core");
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var throttler_1 = require("@nestjs/throttler");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var request_logger_middleware_1 = require("./middlewares/request-logger.middleware");
var user_module_1 = require("./modules/user/user.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule.prototype.configure = function (consumer) {
        consumer.apply(request_logger_middleware_1.RequestLoggerMiddleware).forRoutes('');
    };
    AppModule = __decorate([
        common_1.Module({
            imports: [
                config_1.ConfigModule.forRoot({
                    isGlobal: true,
                    envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env'
                }),
                throttler_1.ThrottlerModule.forRoot({
                    ttl: 60,
                    limit: 10
                }),
                config_1.ConfigService,
                user_module_1.UserModule,
            ],
            controllers: [app_controller_1.AppController],
            providers: [
                app_service_1.AppService,
                common_1.Logger,
                {
                    provide: core_1.APP_GUARD,
                    useClass: throttler_1.ThrottlerGuard
                },
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
