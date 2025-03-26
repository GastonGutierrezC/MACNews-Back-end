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
const user_entity_1 = require("./DomainLayer/Entities/user.entity");
const applicationForm_entity_1 = require("./DomainLayer/Entities/applicationForm.entity");
const channel_entity_1 = require("./DomainLayer/Entities/channel.entity");
const channel_module_1 = require("./modules/channel.module");
const news_entity_1 = require("./DomainLayer/Entities/news.entity");
const news_module_1 = require("./modules/news.module");
const pasword_entity_1 = require("./DomainLayer/Entities/pasword.entity");
const roles_entity_1 = require("./DomainLayer/Entities/roles.entity");
const applicationForm_module_1 = require("./modules/applicationForm.module");
const journalist_entity_1 = require("./DomainLayer/Entities/journalist.entity");
const journalist_module_1 = require("./modules/journalist.module");
const followChannel_entity_1 = require("./DomainLayer/Entities/followChannel.entity");
const followChannel_module_1 = require("./modules/followChannel.module");
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
                entities: [followChannel_entity_1.FollowChannelEntity, journalist_entity_1.JournalistEntity, user_entity_1.UserEntity, applicationForm_entity_1.ApplicationFormEntity, channel_entity_1.ChannelEntity, news_entity_1.NewsEntity, pasword_entity_1.PasswordEntity, roles_entity_1.RolesEntity],
                synchronize: false,
            }),
            user_module_1.UserModule,
            applicationForm_module_1.ApplicationFormModule,
            channel_module_1.ChannelModule,
            news_module_1.NewsModule,
            journalist_module_1.JournalistModule,
            followChannel_module_1.FollowChannelModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map