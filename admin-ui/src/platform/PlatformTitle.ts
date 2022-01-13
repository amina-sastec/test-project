import { Platform as TPlatform } from "../api/platform/Platform";

export const PLATFORM_TITLE_FIELD = "id";

export const PlatformTitle = (record: TPlatform): string => {
  return record.id || record.id;
};
