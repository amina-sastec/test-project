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
import { DeleteMediaArgs } from "./DeleteMediaArgs";
import { MediaFindManyArgs } from "./MediaFindManyArgs";
import { MediaFindUniqueArgs } from "./MediaFindUniqueArgs";
import { Media } from "./Media";
import { MediaService } from "../media.service";

@graphql.Resolver(() => Media)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class MediaResolverBase {
  constructor(
    protected readonly service: MediaService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Media",
    action: "read",
    possession: "any",
  })
  async _mediasMeta(
    @graphql.Args() args: MediaFindManyArgs
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

  @graphql.Query(() => [Media])
  @nestAccessControl.UseRoles({
    resource: "Media",
    action: "read",
    possession: "any",
  })
  async medias(
    @graphql.Args() args: MediaFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Media[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Media",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Media, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Media",
    action: "read",
    possession: "own",
  })
  async media(
    @graphql.Args() args: MediaFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Media | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Media",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Media)
  @nestAccessControl.UseRoles({
    resource: "Media",
    action: "delete",
    possession: "any",
  })
  async deleteMedia(
    @graphql.Args() args: DeleteMediaArgs
  ): Promise<Media | null> {
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
