import { Live as TLive } from "../api/live/Live";

export const LIVE_TITLE_FIELD = "id";

export const LiveTitle = (record: TLive): string => {
  return record.id || record.id;
};
