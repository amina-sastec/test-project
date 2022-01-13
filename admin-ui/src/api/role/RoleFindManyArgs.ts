import { RoleWhereInput } from "./RoleWhereInput";
import { RoleOrderByInput } from "./RoleOrderByInput";

export type RoleFindManyArgs = {
  where?: RoleWhereInput;
  orderBy?: RoleOrderByInput;
  skip?: number;
  take?: number;
};
