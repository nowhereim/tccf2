import { Module } from '@nestjs/common';
import { LectureModule } from './lecture/lecture.module';
import { DatabaseModule } from './libs/datasource/module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LectureModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
