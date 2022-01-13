import { SortOrder } from "../../util/SortOrder";

export type VideoOrderByInput = {
  id?: SortOrder;
  createdAt?: SortOrder;
  updatedAt?: SortOrder;
  name?: SortOrder;
};
