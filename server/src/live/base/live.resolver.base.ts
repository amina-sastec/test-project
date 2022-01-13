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
import { DeleteLiveArgs } from "./DeleteLiveArgs";
import { LiveFindManyArgs } from "./LiveFindManyArgs";
import { LiveFindUniqueArgs } from "./LiveFindUniqueArgs";
import { Live } from "./Live";
import { LiveService } from "../live.service";

@graphql.Resolver(() => Live)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class LiveResolverBase {
  constructor(
    protected readonly service: LiveService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Live",
    action: "read",
    possession: "any",
  })
  async _livesMeta(
    @graphql.Args() args: LiveFindManyArgs
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

  @graphql.Query(() => [Live])
  @nestAccessControl.UseRoles({
    resource: "Live",
    action: "read",
    possession: "any",
  })
  async lives(
    @graphql.Args() args: LiveFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Live[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Live",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Live, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Live",
    action: "read",
    possession: "own",
  })
  async live(
    @graphql.Args() args: LiveFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Live | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Live",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Live)
  @nestAccessControl.UseRoles({
    resource: "Live",
    action: "delete",
    possession: "any",
  })
  async deleteLive(@graphql.Args() args: DeleteLiveArgs): Promise<Live | null> {
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
