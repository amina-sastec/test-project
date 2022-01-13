import { Module } from "@nestjs/common";
import { StreamModuleBase } from "./base/stream.module.base";
import { StreamService } from "./stream.service";
import { StreamController } from "./stream.controller";
import { StreamResolver } from "./stream.resolver";

@Module({
  imports: [StreamModuleBase],
  controllers: [StreamController],
  providers: [StreamService, StreamResolver],
  exports: [StreamService],
})
export class StreamModule {}
