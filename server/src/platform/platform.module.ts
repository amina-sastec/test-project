import { Module } from "@nestjs/common";
import { PlatformModuleBase } from "./base/platform.module.base";
import { PlatformService } from "./platform.service";
import { PlatformController } from "./platform.controller";
import { PlatformResolver } from "./platform.resolver";

@Module({
  imports: [PlatformModuleBase],
  controllers: [PlatformController],
  providers: [PlatformService, PlatformResolver],
  exports: [PlatformService],
})
export class PlatformModule {}
