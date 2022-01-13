import { Media as TMedia } from "../api/media/Media";

export const MEDIA_TITLE_FIELD = "id";

export const MediaTitle = (record: TMedia): string => {
  return record.id || record.id;
};
