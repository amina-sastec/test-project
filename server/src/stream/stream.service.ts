import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { StreamServiceBase } from "./base/stream.service.base";

@Injectable()
export class StreamService extends StreamServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
