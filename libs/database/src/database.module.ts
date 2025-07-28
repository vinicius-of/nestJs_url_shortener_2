import { Module } from '@nestjs/common';
import { PostgresConfigService } from './postgresql.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useClass: PostgresConfigService,
        }),
    ],
})
export class DatabaseModule {}
