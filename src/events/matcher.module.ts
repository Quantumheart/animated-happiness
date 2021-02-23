import { Module } from '@nestjs/common';
import { MatcherGateway } from './matcher.gateway';

@Module({
    imports: [],
    controllers: [],
    providers: [MatcherGateway],
})
export class MatcherModule { }
