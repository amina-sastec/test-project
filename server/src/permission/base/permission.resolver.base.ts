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
import { DeletePermissionArgs } from "./DeletePermissionArgs";
import { PermissionFindManyArgs } from "./PermissionFindManyArgs";
import { PermissionFindUniqueArgs } from "./PermissionFindUniqueArgs";
import { Permission } from "./Permission";
import { PermissionService } from "../permission.service";

@graphql.Resolver(() => Permission)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class PermissionResolverBase {
  constructor(
    protected readonly service: PermissionService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Permission",
    action: "read",
    possession: "any",
  })
  async _permissionsMeta(
    @graphql.Args() args: PermissionFindManyArgs
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

  @graphql.Query(() => [Permission])
  @nestAccessControl.UseRoles({
    resource: "Permission",
    action: "read",
    possession: "any",
  })
  async permissions(
    @graphql.Args() args: PermissionFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Permission[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Permission",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Permission, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Permission",
    action: "read",
    possession: "own",
  })
  async permission(
    @graphql.Args() args: PermissionFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Permission | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Permission",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Permission)
  @nestAccessControl.UseRoles({
    resource: "Permission",
    action: "delete",
    possession: "any",
  })
  async deletePermission(
    @graphql.Args() args: DeletePermissionArgs
  ): Promise<Permission | null> {
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
