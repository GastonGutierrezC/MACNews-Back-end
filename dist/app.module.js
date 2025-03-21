"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("./modules/user.module");
const user_entity_1 = require("./dataLayer/entities/user.entity");
const jounrnalist_module_1 = require("./modules/jounrnalist.module");
const journalist_entity_1 = require("./dataLayer/entities/journalist.entity");
const channel_entity_1 = require("./dataLayer/entities/channel.entity");
const channel_module_1 = require("./modules/channel.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3307,
                username: 'gaston',
                password: 'gaston',
                database: 'MACNews',
                entities: [user_entity_1.UserEntity, journalist_entity_1.JournalistEntity, channel_entity_1.ChannelEntity],
                synchronize: false,
            }),
            user_module_1.UserModule,
            jounrnalist_module_1.JournalistModule,
            channel_module_1.ChannelModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map