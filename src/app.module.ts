import {MatcherModule} from './events/matcher.module';
import {Module} from '@nestjs/common';
import {AuthModule} from "./authentication/auth/auth.module";
import {ConfigModule} from "@nestjs/config";
import {DatabaseModule} from './database/database.module';
import * as Joi from "@hapi/joi";
import {APP_FILTER} from "@nestjs/core";
import {ExceptionsLoggerFilter} from "./helpers/exceptions/exceptionsLoggerFilter";

@Module({
    imports: [
        MatcherModule,
        AuthModule,
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                POSTGRES_HOST: Joi.string().required(),
                POSTGRES_PORT: Joi.number().required(),
                POSTGRES_USER: Joi.string().required(),
                POSTGRES_PASSWORD: Joi.string().required(),
                POSTGRES_DB: Joi.string().required(),
                PORT: Joi.number(),
                JWT_SECRET: Joi.string().required(),
                JWT_EXPIRATION_TIME: Joi.string().required(),
            })
        }),
        DatabaseModule
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: ExceptionsLoggerFilter,
        }
    ]
})
export class AppModule {
}      