import { PrismaService } from "nestjs-prisma";
import { Prisma, Stream } from "@prisma/client";

export class StreamServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.StreamFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.StreamFindManyArgs>
  ): Promise<number> {
    return this.prisma.stream.count(args);
  }

  async findMany<T extends Prisma.StreamFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.StreamFindManyArgs>
  ): Promise<Stream[]> {
    return this.prisma.stream.findMany(args);
  }
  async findOne<T extends Prisma.StreamFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.StreamFindUniqueArgs>
  ): Promise<Stream | null> {
    return this.prisma.stream.findUnique(args);
  }
  async create<T extends Prisma.StreamCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.StreamCreateArgs>
  ): Promise<Stream> {
    return this.prisma.stream.create<T>(args);
  }
  async update<T extends Prisma.StreamUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.StreamUpdateArgs>
  ): Promise<Stream> {
    return this.prisma.stream.update<T>(args);
  }
  async delete<T extends Prisma.StreamDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.StreamDeleteArgs>
  ): Promise<Stream> {
    return this.prisma.stream.delete(args);
  }
}
