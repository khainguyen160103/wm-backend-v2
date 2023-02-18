import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { AppController } from './app.controller'
import { AppService } from './app.service'

const schemaName = 'mr_user'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: process.env.MYSQL_DATABASE,
      entities: ['dist/**/*.entity{.ts,.js}'], // get all entities
      host: process.env.MYSQL_HOST,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      name: schemaName,
      logging: false,
      synchronize: false,
      namingStrategy: new SnakeNamingStrategy()
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
