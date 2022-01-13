import { PermissionWhereInput } from "./PermissionWhereInput";
import { PermissionOrderByInput } from "./PermissionOrderByInput";

export type PermissionFindManyArgs = {
  where?: PermissionWhereInput;
  orderBy?: PermissionOrderByInput;
  skip?: number;
  take?: number;
};
