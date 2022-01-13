import { Video as TVideo } from "../api/video/Video";

export const VIDEO_TITLE_FIELD = "fileName";

export const VideoTitle = (record: TVideo): string => {
  return record.fileName || record.id;
};
