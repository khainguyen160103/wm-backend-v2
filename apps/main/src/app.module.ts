import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GroupModule } from './group/group.module'

const schemaName = 'mr_user'

// import entities
import { User } from './user/entities'
import { Group } from './group/entities'

const entities: any[] = [User, Group]

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: schemaName,
      entities, // get all entities
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      logging: false,
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    GroupModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
