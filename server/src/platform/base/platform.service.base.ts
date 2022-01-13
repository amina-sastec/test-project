import { PrismaService } from "nestjs-prisma";
import { Prisma, Platform } from "@prisma/client";

export class PlatformServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.PlatformFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.PlatformFindManyArgs>
  ): Promise<number> {
    return this.prisma.platform.count(args);
  }

  async findMany<T extends Prisma.PlatformFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.PlatformFindManyArgs>
  ): Promise<Platform[]> {
    return this.prisma.platform.findMany(args);
  }
  async findOne<T extends Prisma.PlatformFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.PlatformFindUniqueArgs>
  ): Promise<Platform | null> {
    return this.prisma.platform.findUnique(args);
  }
  async create<T extends Prisma.PlatformCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.PlatformCreateArgs>
  ): Promise<Platform> {
    return this.prisma.platform.create<T>(args);
  }
  async update<T extends Prisma.PlatformUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.PlatformUpdateArgs>
  ): Promise<Platform> {
    return this.prisma.platform.update<T>(args);
  }
  async delete<T extends Prisma.PlatformDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.PlatformDeleteArgs>
  ): Promise<Platform> {
    return this.prisma.platform.delete(args);
  }
}
