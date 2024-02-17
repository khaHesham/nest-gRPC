import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AUTH_PACKAGE_NAME } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.GRPC,  // specify the transport to be used
      options: {                  // specify proto path and package
        protoPath: join(__dirname, '../auth.proto'), // path to the proto file
        package: AUTH_PACKAGE_NAME,                  // package name to be used on server side and client side
      },
    },
  );
  await app.listen();
}
bootstrap();
