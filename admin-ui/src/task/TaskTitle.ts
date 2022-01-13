import { Task as TTask } from "../api/task/Task";

export const TASK_TITLE_FIELD = "zaz";

export const TaskTitle = (record: TTask): string => {
  return record.zaz || record.id;
};
