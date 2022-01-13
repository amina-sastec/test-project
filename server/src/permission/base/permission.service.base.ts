import { PrismaService } from "nestjs-prisma";
import { Prisma, Permission } from "@prisma/client";

export class PermissionServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.PermissionFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.PermissionFindManyArgs>
  ): Promise<number> {
    return this.prisma.permission.count(args);
  }

  async findMany<T extends Prisma.PermissionFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.PermissionFindManyArgs>
  ): Promise<Permission[]> {
    return this.prisma.permission.findMany(args);
  }
  async findOne<T extends Prisma.PermissionFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.PermissionFindUniqueArgs>
  ): Promise<Permission | null> {
    return this.prisma.permission.findUnique(args);
  }
  async create<T extends Prisma.PermissionCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.PermissionCreateArgs>
  ): Promise<Permission> {
    return this.prisma.permission.create<T>(args);
  }
  async update<T extends Prisma.PermissionUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.PermissionUpdateArgs>
  ): Promise<Permission> {
    return this.prisma.permission.update<T>(args);
  }
  async delete<T extends Prisma.PermissionDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.PermissionDeleteArgs>
  ): Promise<Permission> {
    return this.prisma.permission.delete(args);
  }
}
