import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '167.71.20.37', // o la dirección del servidor de tu base de datos
      port: 3214, // el puerto por defecto de PostgreSQL
      username: 'postgres', // reemplaza con tu usuario de PostgreSQL
      password: 'ad24e6281f06b3bc0795', // reemplaza con tu contraseña de PostgreSQL
      database: 'kromly', // reemplaza con el nombre de tu base de datos
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // especifica la ubicación de tus entidades
      synchronize: true, // en desarrollo puede estar en true para sincronizar el esquema de la bd automáticamente
      logging: false,
    }),
    UsersModule,
    ProductsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
