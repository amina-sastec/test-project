import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { PlatformService } from "./platform.service";
import { PlatformControllerBase } from "./base/platform.controller.base";

@swagger.ApiTags("platforms")
@common.Controller("platforms")
export class PlatformController extends PlatformControllerBase {
  constructor(
    protected readonly service: PlatformService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
