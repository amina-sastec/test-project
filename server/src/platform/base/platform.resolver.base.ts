import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { DeletePlatformArgs } from "./DeletePlatformArgs";
import { PlatformFindManyArgs } from "./PlatformFindManyArgs";
import { PlatformFindUniqueArgs } from "./PlatformFindUniqueArgs";
import { Platform } from "./Platform";
import { PlatformService } from "../platform.service";

@graphql.Resolver(() => Platform)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class PlatformResolverBase {
  constructor(
    protected readonly service: PlatformService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Platform",
    action: "read",
    possession: "any",
  })
  async _platformsMeta(
    @graphql.Args() args: PlatformFindManyArgs
  ): Promise<MetaQueryPayload> {
    const results = await this.service.count({
      ...args,
      skip: undefined,
      take: undefined,
    });
    return {
      count: results,
    };
  }

  @graphql.Query(() => [Platform])
  @nestAccessControl.UseRoles({
    resource: "Platform",
    action: "read",
    possession: "any",
  })
  async platforms(
    @graphql.Args() args: PlatformFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Platform[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Platform",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Platform, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Platform",
    action: "read",
    possession: "own",
  })
  async platform(
    @graphql.Args() args: PlatformFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Platform | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Platform",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Platform)
  @nestAccessControl.UseRoles({
    resource: "Platform",
    action: "delete",
    possession: "any",
  })
  async deletePlatform(
    @graphql.Args() args: DeletePlatformArgs
  ): Promise<Platform | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }
}
