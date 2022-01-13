import { Permission as TPermission } from "../api/permission/Permission";

export const PERMISSION_TITLE_FIELD = "id";

export const PermissionTitle = (record: TPermission): string => {
  return record.id || record.id;
};
