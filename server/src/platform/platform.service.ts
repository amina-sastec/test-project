import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { PlatformServiceBase } from "./base/platform.service.base";

@Injectable()
export class PlatformService extends PlatformServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
