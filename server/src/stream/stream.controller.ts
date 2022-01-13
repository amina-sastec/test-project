import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { StreamService } from "./stream.service";
import { StreamControllerBase } from "./base/stream.controller.base";

@swagger.ApiTags("streams")
@common.Controller("streams")
export class StreamController extends StreamControllerBase {
  constructor(
    protected readonly service: StreamService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
