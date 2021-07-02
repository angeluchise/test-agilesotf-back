import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { TaskController } from './controllers/task.controller';
import { UsersController } from './controllers/user.controller';
import Task from './models/task/task.entity';
import User from './models/user/user.entity';
import { TaskService } from './services/task/task.service';
import { UserService } from './services/user/user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LoginService } from './services/login/login.service';
import { AuthController } from './controllers/auth.controller';
import { JwtStrategy } from './utils/passport/jwt.strategy';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const options = {
          // eslint-disable-next-line @typescript-eslint/prefer-as-const
          type: 'mysql' as 'mysql',
          host: configService.DB_HOST,
          port: configService.DB_PORT,
          username: configService.DB_USERNAME,
          password: configService.DB_PASSWORD,
          database: configService.DB_DATABASE,
          synchronize: configService.SYNCHRONIZE,
          migrationsRun: configService.MIGRATION_RUN,
          dropSchema: false,
          entities: [__dirname + '/models/**/*.entity{.ts,.js}'],
          migrations: [__dirname + '/**/migration/*{.ts,.js}'],
          cli: {
            migrationsDir: 'src/migrations',
          },
        };
        return options;
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, Task]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'secretKey123456',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  controllers: [AppController, UsersController, TaskController, AuthController],
  providers: [AppService, UserService, TaskService, LoginService, JwtStrategy],
})
export class AppModule {}
