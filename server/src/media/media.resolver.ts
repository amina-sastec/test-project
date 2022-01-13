import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { MediaResolverBase } from "./base/media.resolver.base";
import { Media } from "./base/Media";
import { MediaService } from "./media.service";

@graphql.Resolver(() => Media)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class MediaResolver extends MediaResolverBase {
  constructor(
    protected readonly service: MediaService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
