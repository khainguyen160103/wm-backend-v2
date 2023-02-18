import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { AppController } from './app.controller'
import { AppService } from './app.service'

const schemaName = 'mr_user'

// import entities
import { User } from './user/entities'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: schemaName,
      entities: [User], // get all entities
      host: process.env.MYSQL_HOST,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      logging: true,
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy()
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
