import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

export const configureDb = () => {
  return <TypeOrmModuleOptions>{
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: +process.env.MYSQL_PORT,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    namingStrategy: new SnakeNamingStrategy(),
    autoLoadEntities: true,
    logging: false,
    synchronize: true,
  }
}
