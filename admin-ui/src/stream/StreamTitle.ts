import { Stream as TStream } from "../api/stream/Stream";

export const STREAM_TITLE_FIELD = "id";

export const StreamTitle = (record: TStream): string => {
  return record.id || record.id;
};
