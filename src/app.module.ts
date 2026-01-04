import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ApartmentsModule } from './modules/apartments/apartments.module';
import { TenantsModule } from './modules/tenants/tenants.module';

@Module({
  imports: [AuthModule, ApartmentsModule, TenantsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
